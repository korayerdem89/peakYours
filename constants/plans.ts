export interface PlanProps {
  type: 'monthly' | 'annual';
  savings?: string;
  isPopular?: boolean;
  packageType: 'MONTHLY' | 'ANNUAL';
}

export const SUBSCRIPTION_PLANS: PlanProps[] = [
  {
    type: 'monthly',
    packageType: 'MONTHLY',
  },
  {
    type: 'annual',
    savings: '50%',
    isPopular: true,
    packageType: 'ANNUAL',
  },
];
