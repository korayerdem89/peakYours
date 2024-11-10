import { useQuery } from '@tanstack/react-query';
import { RatingService } from '@/services/rating';
import { TraitAverages } from '@/types/traits';

export function useTraitAverages(
  referenceCode: string | undefined,
  type: 'goodsides' | 'badsides'
) {
  return useQuery<TraitAverages[]>({
    queryKey: ['traitAverages', referenceCode, type],
    queryFn: () => RatingService.getTraitAverages(referenceCode!, type),
    enabled: !!referenceCode,
    staleTime: 1000 * 60 * 5, // 5 dakika stale time
    gcTime: 1000 * 60 * 30, // 30 dakika garbage collection time
    retry: 2, // Başarısız istekleri 2 kez tekrar dene
    refetchOnWindowFocus: true, // Pencere fokuslandığında yeniden çek
  });
}
