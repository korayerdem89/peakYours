import { useQuery } from '@tanstack/react-query';
import { RatingService } from '@/services/rating';
import { TraitDetails } from '@/types/traits';

export function useTraitDetails(referenceCode: string | undefined, type: 'goodsides' | 'badsides') {
  return useQuery<TraitDetails>({
    queryKey: ['traitDetails', referenceCode, type],
    queryFn: () => RatingService.getTraitDetails(referenceCode!, type),
    enabled: !!referenceCode,
    staleTime: 1000 * 60 * 5, // 5 dakika stale time
    gcTime: 1000 * 60 * 30, // 30 dakika garbage collection time
    retry: 2,
    refetchOnWindowFocus: true,
  });
}
