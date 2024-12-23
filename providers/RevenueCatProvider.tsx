import { useAuth } from '@/store/useAuth';
import { useLoadingStore } from '@/store/useLoadingStore';
import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PurchasesPackage,
  CustomerInfo,
  PurchasesError,
} from 'react-native-purchases';
import { useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '@/config/firebase';
import { useUpdateUser } from '@/hooks/useUserQueries';
import { Timestamp } from '@react-native-firebase/firestore';
import { Membership } from '@/types/user';

const APIKeys = {
  apple: 'appl_vsVDjUeKsRUioneAWHaZzOGebRZ',
  google: 'goog_zaEtRXMlJRtXuHczQqPFVyrnYoP',
};

// MembershipType enum'u burada tanımlayalım
enum MembershipType {
  FREE = 'FREE',
  PRO = 'PRO',
}

interface RevenueCatProps {
  subscribeUser: (type: PurchasesPackage) => Promise<CustomerInfo | undefined>;
  restorePermissions: () => Promise<CustomerInfo>;
  packages: PurchasesPackage[];
  currentOffering: string | null;
  allPackages: PurchasesPackage[];
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);
const ENTITLEMENT_ID = 'pro_access'; // RevenueCat dashboard'da tanımladığınız entitlement ID
export const RevenueCatProvider = ({ children }: { children: React.ReactNode }) => {
  const [customerInfoListener, setCustomerInfoListener] = useState<(() => void) | null>(null);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [allPackages, setAllPackages] = useState<PurchasesPackage[]>([]);
  const [currentOffering, setCurrentOffering] = useState<string | null>(null);
  const { setIsLoading } = useLoadingStore();
  const queryClient = useQueryClient();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { user } = useAuth();

  console.log(allPackages, 'allPackages');
  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);

        // Configure RevenueCat
        if (Platform.OS === 'android') {
          await Purchases.configure({ apiKey: APIKeys.google });
        } else {
          await Purchases.configure({ apiKey: APIKeys.apple });
        }

        Purchases.setLogLevel(LOG_LEVEL.DEBUG);

        // İlk subscription kontrolü
        await checkSubscriptionStatus();

        // Subscription değişiklik listener'ı
        const listener = Purchases.addCustomerInfoUpdateListener(async (info) => {
          await checkSubscriptionStatus();
        });
        setCustomerInfoListener(() => listener);

        await loadOfferings();
      } catch (error) {
        console.error('RevenueCat initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    // Saatlik kontrol
    const interval = setInterval(
      () => {
        checkSubscriptionStatus();
      },
      60 * 60 * 1000
    );

    // Cleanup
    return () => {
      clearInterval(interval);
      if (customerInfoListener) {
        customerInfoListener(); // Listener'ı temizle
      }
    };
  }, []);

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();

      if (offerings.current) {
        setPackages(offerings.current.availablePackages);
        setCurrentOffering(offerings.current.identifier);
        setAllPackages(
          Object.values(offerings.all).flatMap((offering) => offering.availablePackages)
        );
      }
    } catch (error) {
      console.error('Error loading offerings:', error);
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const hasProAccess = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

      const user = getCurrentUser();
      if (!user?.uid) return;

      if (hasProAccess) {
        const proEntitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
        const expirationDate = proEntitlement.expirationDate
          ? new Date(proEntitlement.expirationDate)
          : null;
        const willRenew = proEntitlement.willRenew;

        const membership: Membership = {
          type: 'pro',
          startDate: Timestamp.now(),
          endDate: expirationDate ? Timestamp.fromDate(expirationDate) : null,
          lastUpdated: Timestamp.now(),
          willRenew,
          productId: proEntitlement.productIdentifier,
          identifier: user.uid,
        };

        await updateUser({
          userId: user.uid,
          data: { membership },
        });
      } else {
        const membership: Membership = {
          type: 'free',
          startDate: Timestamp.now(),
          endDate: null,
          lastUpdated: Timestamp.now(),
          willRenew: false,
          identifier: user.uid,
        };

        await updateUser({
          userId: user.uid,
          data: { membership },
        });
      }

      queryClient.invalidateQueries({ queryKey: ['user'] });
    } catch (error) {
      console.error('Subscription status check failed:', error);
    }
  };

  const subscribeUser = async (packageToPurchase: PurchasesPackage) => {
    try {
      setIsLoading(true);

      const { customerInfo, productIdentifier } =
        await Purchases.purchasePackage(packageToPurchase);

      // Subscription kontrolü Firestore güncellemesini yapacak
      await checkSubscriptionStatus();

      return customerInfo;
    } catch (error) {
      const purchaseError = error as PurchasesError;
      if (!purchaseError.userCancelled) {
        throw error;
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const restorePermissions = async () => {
    try {
      setIsLoading(true);
      const customerInfo = await Purchases.restorePurchases();
      await checkSubscriptionStatus();
      return customerInfo;
    } catch (error) {
      console.error('Error restoring purchases:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    restorePermissions,
    packages,
    subscribeUser,
    currentOffering,
    allPackages,
  };

  return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
};

export const useRevenueCat = () => {
  return useContext(RevenueCatContext) as RevenueCatProps;
};
