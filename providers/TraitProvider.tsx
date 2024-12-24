import React, { createContext, useContext } from 'react';
import { useTraitDetails } from '@/hooks/useTraitDetails';
import { useTraitAverages } from '@/hooks/useTraitAverages';
import { useUserData } from '@/hooks/useUserQueries';
import { useAuth } from '@/store/useAuth';
import { TraitAverages, TraitDetails } from '@/types/traits';
import { UserProfile } from '@/types/user';

interface TraitContextType {
  goodTraits: ReturnType<typeof useTraitAverages>;
  badTraits: ReturnType<typeof useTraitAverages>;
  traitDetails: TraitDetails | undefined;
  userData: UserProfile | null | undefined;
  refCode: string | undefined;
}

const TraitContext = createContext<TraitContextType | undefined>(undefined);

export function TraitProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);
  const refCode = userData?.refCodes?.en;

  const { data: traitDetails } = useTraitDetails(refCode, 'goodsides');
  const goodTraits = useTraitAverages(refCode, 'goodsides', userData);
  const badTraits = useTraitAverages(refCode, 'badsides', userData);

  return (
    <TraitContext.Provider
      value={{
        goodTraits,
        badTraits,
        traitDetails,
        userData,
        refCode,
      }}>
      {children}
    </TraitContext.Provider>
  );
}

export function useTraits() {
  const context = useContext(TraitContext);
  if (context === undefined) {
    throw new Error('useTraits must be used within a TraitProvider');
  }
  return context;
}
