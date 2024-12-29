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
import Toast from 'react-native-toast-message';

import { router } from 'expo-router';

const APIKeys = {
  apple: 'appl_vsVDjUeKsRUioneAWHaZzOGebRZ',
  google: 'goog_zaEtRXMlJRtXuHczQqPFVyrnYoP',
};

const ENTITLEMENT_ID = 'entla24afb26a4';
const ENTITLEMENT_ID_DISCOUNTED_ID = 'entl5013750d15';
const PRODUCT_ID = 'prod22e383a563';
const PRODUCTS = [
  'pro_monthly:basicplan',
  'pro_annual1:annualbasic2',
  'pro_monthly',
  'pro_annual',
  'pro_monthly_discounted:basicplan-discounted',
  'pro_monthly_discounted',
  'pro_annual_discounted:annual-discounted2',
  'pro_annual_discounted',
];
interface RevenueCatProps {
  subscribeUser: (type: PurchasesPackage, locale: string) => Promise<CustomerInfo | undefined>;
  restorePermissions: () => Promise<CustomerInfo>;
  packages: PurchasesPackage[];
  currentOffering: string | null;
  allPackages: PurchasesPackage[];
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);
export const RevenueCatProvider = ({ children }: { children: React.ReactNode }) => {
  const [customerInfoListener, setCustomerInfoListener] = useState<(() => void) | null>(null);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [allPackages, setAllPackages] = useState<PurchasesPackage[]>([]);
  const [currentOffering, setCurrentOffering] = useState<string | null>(null);
  const { setIsLoading } = useLoadingStore();
  const queryClient = useQueryClient();
  const { mutateAsync: updateUser } = useUpdateUser();

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

      // Aktif abonelikleri kontrol et
      const activeSubscriptions = customerInfo.activeSubscriptions || [];

      // Entitlement ve aktif abonelik kontrolü
      const hasProAccess =
        customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined ||
        activeSubscriptions.some((subscription) => PRODUCTS.includes(subscription)) ||
        customerInfo.entitlements.active[ENTITLEMENT_ID_DISCOUNTED_ID] !== undefined;

      console.log('Has Pro Access:', hasProAccess);

      const user = getCurrentUser();
      if (!user?.uid) {
        return;
      }

      if (hasProAccess) {
        // Aktif abonelik bilgilerini al
        const latestTransaction = customerInfo.latestExpirationDate
          ? new Date(customerInfo.latestExpirationDate)
          : null;

        const membership: Membership = {
          type: 'pro',
          startDate: Timestamp.now(),
          endDate: latestTransaction ? Timestamp.fromDate(latestTransaction) : null,
          lastUpdated: Timestamp.now(),
          willRenew: customerInfo.originalPurchaseDate !== null,
          productId: PRODUCT_ID,
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
      console.error('Error details:', JSON.stringify(error, null, 2));
    }
  };

  const subscribeUser = async (packageToPurchase: PurchasesPackage, locale: string) => {
    try {
      setIsLoading(true);

      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      // Double check subscription status

      await checkSubscriptionStatus();
      const successMessage =
        locale === 'es'
          ? '¡Compra Exitosa!'
          : locale === 'tr'
            ? 'Satın Alma Başarılı!'
            : 'Purchase Succesful';
      const successDescription =
        locale === 'es'
          ? '¡Bienvenido a las funciones premium! Disfruta tu viaje.'
          : locale === 'tr'
            ? 'Premium özelliklere hoş geldiniz'
            : 'Welcome to premium features!';
      router.back();
      Toast.show({
        type: 'success',
        text1: successMessage,
        position: 'top',
        text2: successDescription,
        visibilityTime: 5000,
      });

      return customerInfo;
    } catch (error) {
      console.log('Subscribe user error:', error);
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

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);

        if (Platform.OS === 'android') {
          await Purchases.configure({ apiKey: APIKeys.google });
        } else {
          await Purchases.configure({ apiKey: APIKeys.apple });
        }

        Purchases.setLogLevel(LOG_LEVEL.DEBUG);

        await checkSubscriptionStatus();

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

    const interval = setInterval(() => {
      checkSubscriptionStatus();
    }, 6000 * 1000);

    return () => {
      clearInterval(interval);
      if (customerInfoListener) {
        customerInfoListener();
      }
    };
  }, []);

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
