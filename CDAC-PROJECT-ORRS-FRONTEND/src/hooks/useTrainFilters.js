import { useState } from 'react';

/**
 * useTrainFilters Hook
 * Responsibility: Manage train filtering logic and state
 */
export default function useTrainFilters() {
  const [filters, setFilters] = useState({
    trainType: '',
    classes: []
  });
  const [activeFilters, setActiveFilters] = useState(0);

  const handleTrainTypeFilter = (type) => {
    const newType = filters.trainType === type ? '' : type;
    setFilters(prev => ({ ...prev, trainType: newType }));
    setActiveFilters(newType ? (filters.classes.length > 0 ? filters.classes.length + 1 : 1) : filters.classes.length);
  };

  const handleClassFilter = (cls) => {
    const newClasses = filters.classes.includes(cls)
      ? filters.classes.filter(c => c !== cls)
      : [...filters.classes, cls];
    setFilters(prev => ({ ...prev, classes: newClasses }));
    setActiveFilters(newClasses.length + (filters.trainType ? 1 : 0));
  };

  const resetFilters = () => {
    setFilters({
      trainType: '',
      classes: []
    });
    setActiveFilters(0);
  };

  return {
    filters,
    activeFilters,
    handleTrainTypeFilter,
    handleClassFilter,
    resetFilters
  };
}