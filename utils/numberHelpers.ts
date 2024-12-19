import { UserTraits, TraitAverage } from '@/types/user';

export function calculateTraitValue(
  traitName: string,
  traitAverages: TraitAverage[] | undefined,
  userTraits: UserTraits | undefined,
  isGoodTrait: boolean
): number {
  const baseValue = traitAverages?.find((t) => t.trait === traitName)?.averagePoints ?? 0;
  const userValue = Math.floor((userTraits?.[traitName] ?? 0) / 5);

  const calculatedValue = isGoodTrait ? baseValue * 10 + userValue : baseValue * 10 - userValue;

  // 100'den büyük değerleri 100'e sabitle
  return Math.min(Math.max(calculatedValue, 0), 100);
}

export function getUserTraitValue(trait: string, userTraits: any[]): number {
  return userTraits?.find((t) => t.trait === trait)?.points ?? 0;
}
