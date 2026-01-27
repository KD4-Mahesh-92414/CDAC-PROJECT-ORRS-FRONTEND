import FilterSection from './FilterSection';
import { FunnelIcon, RectangleStackIcon, TicketIcon } from "@heroicons/react/24/outline";

/**
 * TrainFilters Component
 * Responsibility: Manage and display all train filtering options
 */
export default function TrainFilters({ 
  filters, 
  activeFilters, 
  onTrainTypeFilter, 
  onClassFilter 
}) {
  const trainTypes = [
    "Super Fast Express",
    "Express Train", 
    "Vande Bharat Express",
    "Passenger Trains"
  ];

  const travelClasses = [
    "AC 1st",
    "AC 2nd", 
    "AC 3rd",
    "Sleeper",
    "Chair Car",
    "Executive"
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white border-2 border-violet-300 rounded-2xl shadow-sm p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-violet-600" />
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
          </div>
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
            {activeFilters} active
          </span>
        </div>
        
        <div className="space-y-6">
          <FilterSection
            title={
              <div className="flex items-center gap-2">
                <RectangleStackIcon className="w-4 h-4 text-violet-600" />
                <span>Train Type</span>
              </div>
            }
            items={trainTypes}
            selectedItems={filters.trainType ? [filters.trainType] : []}
            onItemClick={onTrainTypeFilter}
            multiSelect={false}
          />

          <FilterSection
            title={
              <div className="flex items-center gap-2">
                <TicketIcon className="w-4 h-4 text-violet-600" />
                <span>Travel Class</span>
              </div>
            }
            items={travelClasses}
            selectedItems={filters.classes}
            onItemClick={onClassFilter}
            multiSelect={true}
            gridLayout={true}
          />
        </div>
      </div>
    </div>
  );
}