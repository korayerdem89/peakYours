import { useQuery } from '@tanstack/react-query';
import { RatingService } from '@/services/rating';
import { TraitAverages } from '@/types/traits';
import { calculateTraitValue } from '@/utils/numberHelpers';
import { theme } from '@/constants/theme';
import { useMemo } from 'react';
import { UserProfile } from '@/types/user';

export function useTraitAverages(
  referenceCode: string | undefined,
  type: 'goodsides' | 'badsides',
  userData: UserProfile | null | undefined
) {
  const { data: traitAverages } = useQuery<TraitAverages[]>({
    queryKey: ['traitAverages', referenceCode, type],
    queryFn: () => RatingService.getTraitAverages(referenceCode!, type),
    enabled: !!referenceCode,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: true,
  });

  const colorPalette = [
    '#D94141',
    '#D96448',
    '#D97650',
    '#D98E62',
    '#D99777',
    '#D9A18B',
    '#D9AB9F',
  ];

  const traits = useMemo(() => {
    if (type === 'goodsides') {
      return [
        {
          trait: 'empathic',
          color: theme.colors.personality.empathic,
          value: calculateTraitValue('empathic', traitAverages, userData?.traits, true),
        },
        {
          trait: 'friendly',
          color: theme.colors.personality.friendly,
          value: calculateTraitValue('friendly', traitAverages, userData?.traits, true),
        },
        {
          trait: 'helpful',
          color: theme.colors.personality.helpful,
          value: calculateTraitValue('helpful', traitAverages, userData?.traits, true),
        },
        {
          trait: 'honest',
          color: theme.colors.personality.honest,
          value: calculateTraitValue('honest', traitAverages, userData?.traits, true),
        },
        {
          trait: 'patient',
          color: theme.colors.personality.patient,
          value: calculateTraitValue('patient', traitAverages, userData?.traits, true),
        },
        {
          trait: 'reliable',
          color: theme.colors.personality.reliable,
          value: calculateTraitValue('reliable', traitAverages, userData?.traits, true),
        },
        {
          trait: 'respectful',
          color: theme.colors.personality.respectful,
          value: calculateTraitValue('respectful', traitAverages, userData?.traits, true),
        },
      ];
    } else {
      const unsortedTraits = [
        {
          trait: 'arrogant',
          value: calculateTraitValue('arrogant', traitAverages, userData?.traits, false),
        },
        {
          trait: 'jealous',
          value: calculateTraitValue('jealous', traitAverages, userData?.traits, false),
        },
        {
          trait: 'lazy',
          value: calculateTraitValue('lazy', traitAverages, userData?.traits, false),
        },
        {
          trait: 'pessimistic',
          value: calculateTraitValue('pessimistic', traitAverages, userData?.traits, false),
        },
        {
          trait: 'selfish',
          value: calculateTraitValue('selfish', traitAverages, userData?.traits, false),
        },
        {
          trait: 'forgetful',
          value: calculateTraitValue('forgetful', traitAverages, userData?.traits, false),
        },
        {
          trait: 'angry',
          value: calculateTraitValue('angry', traitAverages, userData?.traits, false),
        },
      ];

      return unsortedTraits
        .sort((a, b) => b.value - a.value)
        .map((trait, index) => ({
          ...trait,
          color: colorPalette[index],
        }));
    }
  }, [traitAverages, userData?.traits, type]);

  return traits;
}
