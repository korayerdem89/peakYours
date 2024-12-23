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
import { collections } from '@/config/firebase';
import { useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '@/config/firebase';
import { useUpdateUser, useUserData } from '@/hooks/useUserQueries';
import { MembershipType } from '@/types/user';
import { Timestamp } from '@react-native-firebase/firestore';

const APIKeys = {
  apple: 'appl_vsVDjUeKsRUioneAWHaZzOGebRZ',
  google: 'goog_zaEtRXMlJRtXuHczQqPFVyrnYoP',
};

interface RevenueCatProps {
  subscribeUser: (type: PurchasesPackage) => Promise<CustomerInfo | undefined>;
  restorePermissions: () => Promise<CustomerInfo>;
  packages: PurchasesPackage[];
  currentOffering: string | null;
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);

export const RevenueCatProvider = ({ children }: { children: React.ReactNode }) => {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [currentOffering, setCurrentOffering] = useState<string | null>(null);
  const { setIsLoading } = useLoadingStore();
  const queryClient = useQueryClient();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { user } = useAuth();

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

        // Listen for customer updates
        Purchases.addCustomerInfoUpdateListener(async (info) => {
          await updateCustomerInformation(info);
        });

        // Load initial offerings
        await loadOfferings();
      } catch (error) {
        console.error('RevenueCat initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();

      if (offerings.current) {
        setPackages(offerings.current.availablePackages);
        setCurrentOffering(offerings.current.identifier);
        console.log(offerings, 'offerings');
      }
    } catch (error) {
      console.error('Error loading offerings:', error);
    }
  };

  const updateCustomerInformation = async (customerInfo: CustomerInfo) => {
    try {
      if (!user?.uid) return;

      const hasProEntitlement = customerInfo?.entitlements.active['PRO Features'] !== undefined;
      const membershipType = hasProEntitlement ? 'pro' : 'free';

      const now = Timestamp.now();

      await updateUser({
        userId: user.uid,
        data: {
          membership: {
            type: membershipType,
            startDate: now,
            endDate: null,
            lastUpdated: now,
            identifier: customerInfo.entitlements.active['PRO Features']?.productIdentifier,
          },
        },
      });

      queryClient.invalidateQueries({ queryKey: ['user'] });
    } catch (error) {
      console.error('Error updating customer information:', error);
    }
  };

  const subscribeUser = async (packageToPurchase: PurchasesPackage) => {
    try {
      setIsLoading(true);

      const { customerInfo, productIdentifier } =
        await Purchases.purchasePackage(packageToPurchase);

      const user = getCurrentUser();
      if (user?.uid) {
        const now = Timestamp.now();

        await updateUser({
          userId: user.uid,
          data: {
            membership: {
              type: 'pro',
              startDate: now,
              endDate: null,
              lastUpdated: now,
              identifier: productIdentifier,
            },
          },
        });

        queryClient.invalidateQueries({ queryKey: ['user'] });
      }

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
  };

  return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
};

export const useRevenueCat = () => {
  return useContext(RevenueCatContext) as RevenueCatProps;
};
