import React from 'react';
import { useAgeGroup } from '../../hooks/useAgeGroup';

/**
 * AdaptiveView conditionally renders children based on the current user's age group.
 * @param {Array<string>} showFor - Array of allowed groups: ['child', 'teen', 'adult']
 * @param {ReactNode} fallback - Component to render if group is not allowed
 */
const AdaptiveView = ({ children, showFor = [], fallback = null }) => {
  const { group } = useAgeGroup();

  if (showFor.includes(group) || showFor.includes('all')) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
};

export default AdaptiveView;
