import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * useAgeGroup hook determines the appropriate UI complexity persona.
 * Based on the user's age, it categorizes them as 'child', 'teen', or 'adult'.
 */
export const useAgeGroup = () => {
  const { user } = useAuth();
  
  return useMemo(() => {
    // Admins and Parents default to 'adult'
    if (user?.role === 'admin' || user?.role === 'parent') {
      return { group: 'adult', isChild: false, isTeen: false, isAdult: true };
    }

    // Default assume adult if no age is provided
    const age = user?.age || 18;

    if (age <= 13) {
      return { group: 'child', isChild: true, isTeen: false, isAdult: false };
    } else if (age >= 14 && age <= 17) {
      return { group: 'teen', isChild: false, isTeen: true, isAdult: false };
    } else {
      return { group: 'adult', isChild: false, isTeen: false, isAdult: true };
    }
  }, [user?.age, user?.role]);
};
