export interface PlanProps {
  type: 'monthly' | 'annually';
  price: string;
  savings?: string;
  isPopular?: boolean;
}

export const SUBSCRIPTION_PLANS: PlanProps[] = [
  {
    type: 'monthly',
    price: '$4.99',
  },
  {
    type: 'annually',
    price: '$39.99',
    savings: '20%',
    isPopular: true,
  },
];
