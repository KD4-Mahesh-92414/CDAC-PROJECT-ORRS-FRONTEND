import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTrain } from "../../store/slices/bookingSlice";
import SearchResultsHeader from "../../components/booking/SearchResultsHeader";
import TrainsList from "../../components/booking/TrainsList";
import TrainFilters from "../../components/booking/TrainFilters";
import useTrainData from "../../hooks/useTrainData";
import useTrainFilters from "../../hooks/useTrainFilters";

/**
 * TrainSearchResults Page
 * Responsibility: Orchestrate train search results display and user interactions
 */
export default function TrainSearchResults() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.booking);
  
  // Custom hooks for separation of concerns
  const { trains, isLoading, error } = useTrainData(searchData);
  const { 
    filters, 
    activeFilters, 
    handleTrainTypeFilter, 
    handleClassFilter 
  } = useTrainFilters();

  const handleSelectTrain = (train) => {
    dispatch(setSelectedTrain(train));
    navigate("/seats");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trains...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12 bg-red-50 border-2 border-red-200 rounded-2xl">
          <p className="text-lg font-semibold text-red-700 mb-2">Error loading trains</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <SearchResultsHeader 
            trainsCount={trains.length} 
            searchData={searchData} 
          />
          <TrainsList 
            trains={trains} 
            onSelectTrain={handleSelectTrain} 
          />
        </div>

        {/* Filters Sidebar */}
        <TrainFilters
          filters={filters}
          activeFilters={activeFilters}
          onTrainTypeFilter={handleTrainTypeFilter}
          onClassFilter={handleClassFilter}
        />
      </div>
    </div>
  );
}
