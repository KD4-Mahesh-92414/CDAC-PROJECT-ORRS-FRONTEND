import { CalendarDaysIcon, MapPinIcon, ArrowRightIcon, RectangleStackIcon } from "@heroicons/react/24/outline";

/**
 * SearchResultsHeader Component
 * Responsibility: Display search results summary and route information
 */
export default function SearchResultsHeader({ trainsCount, searchData }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="mb-8">
      {/* Single Card with All Information */}
      <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 border-2 border-violet-200 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
              <RectangleStackIcon className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {trainsCount} Trains Available
              </h1>
              <p className="text-violet-600 text-sm font-medium">
                Choose your preferred train and class
              </p>
            </div>
          </div>
          
          {/* Date Badge */}
          <div className="flex items-center gap-2 bg-violet-100 px-4 py-2 rounded-full">
            <CalendarDaysIcon className="w-5 h-5 text-violet-600" />
            <span className="font-semibold text-violet-700">{formatDate(searchData.date)}</span>
          </div>
        </div>

        {/* Route Information */}
        <div className="flex items-center justify-between bg-violet-50 rounded-xl p-4">
          {/* From Station */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">
              <MapPinIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">From</p>
              <p className="text-lg font-bold text-gray-900">{searchData.from}</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-1 mx-6 flex items-center justify-center">
            <div className="flex-1 border-t-2 border-dashed border-violet-300"></div>
            <div className="mx-3 bg-white rounded-full p-2 border-2 border-violet-300">
              <ArrowRightIcon className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1 border-t-2 border-dashed border-violet-300"></div>
          </div>

          {/* To Station */}
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-500 font-medium text-right">To</p>
              <p className="text-lg font-bold text-gray-900">{searchData.to}</p>
            </div>
            <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">
              <MapPinIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}