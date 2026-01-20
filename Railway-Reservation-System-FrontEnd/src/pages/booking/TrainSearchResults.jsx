import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BookingContext } from "../../contexts/BookingContext";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function TrainSearchResults() {
  const navigate = useNavigate();
  const { searchData, selectedTrain, setSelectedTrain } =
    useContext(BookingContext);
  const [trains, setTrains] = useState([]);
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

  // Validate that search was performed
  useEffect(() => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      navigate("/");
      return;
    }

    // Mock train data - in real app, fetch from API
    setTrains([
      {
        id: 1,
        number: "15065",
        name: "Nanded Panvel Express",
        departure: "17:45",
        arrival: "12:10",
        duration: "6.25 Hrs",
        departureTime: "17:45",
        arrivalTime: "12:10",
        departureDate: searchData.date,
        arrivalDate: "24 Oct 2025",
        departureStation: searchData.from || "Hujur Sahib Nanded Station",
        arrivalStation: searchData.to || "Pune Railway Station",
        coaches: [
          {
            type: "AC 1st Tier",
            available: 20,
            fare: 2500,
          },
          {
            type: "Sleeper Class",
            available: 123,
            fare: 550,
          },
          {
            type: "AC Chair Car",
            available: 180,
            fare: 1250,
          },
        ],
      },
      {
        id: 2,
        number: "12345",
        name: "SF Express",
        departure: "08:25",
        arrival: "12:10",
        duration: "3.45 Hrs",
        departureTime: "08:25",
        arrivalTime: "12:10",
        departureDate: searchData.date,
        arrivalDate: searchData.date,
        departureStation: searchData.from || "Hujur Sahib Nanded Station",
        arrivalStation: searchData.to || "Pune Railway Station",
        coaches: [
          {
            type: "AC 2nd Tier",
            available: 45,
            fare: 1200,
          },
          {
            type: "AC 3rd Tier",
            available: 89,
            fare: 800,
          },
        ],
      },
    ]);
  }, [searchData, navigate]);

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    navigate("/seats");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {trains.length} Trains Available
            </h2>
            <p className="text-gray-600">
              {searchData.from} → {searchData.to} on {new Date(searchData.date).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-4">
            {trains.map((train) => (
              <div
                key={train.id}
                className="bg-white border-2 border-violet-300 rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer hover:border-violet-500"
                onClick={() => handleSelectTrain(train)}
              >
              {/* Train Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {train.number}
                    </h3>
                    <p className="text-sm text-gray-600">{train.name}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-violet-100 text-violet-600 font-medium rounded text-sm hover:bg-violet-200 transition-colors">
                  Route
                </button>
              </div>

              {/* Journey Timeline */}
              <div className="flex items-center justify-between mb-4 p-4 bg-yellow-100 rounded-lg border border-yellow-200">
                <div>
                  <div className="text-xl font-bold text-gray-900">
                    {train.departure}
                  </div>
                  <p className="text-xs text-gray-600">
                    {train.departureStation}
                  </p>
                  <p className="text-xs text-gray-500">{train.departureDate}</p>
                </div>

                <div className="flex-1 mx-6">
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-violet-600"></div>
                    <div className="flex-1 border-t-8 border-violet-600 mx-2"></div>
                    <div className="mx-3 text-gray-600 font-bold text-sm bg-white px-3 py-1 rounded-full border border-gray-300">
                      {train.duration}
                    </div>
                    <div className="flex-1 border-t-8 border-violet-600 mx-2"></div>
                    <svg className="w-6 h-6 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    {train.arrival}
                  </div>
                  <p className="text-xs text-gray-600">
                    {train.arrivalStation}
                  </p>
                  <p className="text-xs text-gray-500">{train.arrivalDate}</p>
                </div>
              </div>

              {/* Class Options */}
              <div className="space-y-1">
                {train.coaches.map((coach, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 border border-violet-400 rounded hover:bg-violet-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-3 h-3 rounded-full border border-violet-600"></div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {coach.type}
                        </p>
                        <p className="text-xs text-gray-600">
                          Available - {coach.available}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-violet-600">
                        ₹{coach.fare}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            ))}
          </div>

          {trains.length === 0 && (
            <div className="text-center py-12 bg-white border-2 border-violet-100 rounded-2xl">
              <div className="text-6xl mb-4">🚂</div>
              <p className="text-lg font-semibold text-gray-700 mb-2">No trains found</p>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Filters Sidebar - Use the same modern design */}
        <div className="space-y-4">
          <div className="bg-white border-2 border-violet-300 rounded-2xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">🔍 Filters</h3>
              <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                {activeFilters} active
              </span>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🚄 <span>Train Type</span>
                </h4>
                <div className="space-y-2">
                  {[
                    "Super Fast Express",
                    "Express Train", 
                    "Vande Bharat Express",
                    "Passenger Trains"
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTrainTypeFilter(type)}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-200 border-2 ${
                        filters.trainType === type
                          ? 'bg-violet-600 text-white border-violet-600'
                          : 'bg-violet-50 text-gray-700 border-violet-400 hover:bg-violet-100 hover:border-violet-500'
                      }`}
                    >
                      <span className="text-sm font-medium">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🎫 <span>Travel Class</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "AC 1st",
                    "AC 2nd", 
                    "AC 3rd",
                    "Sleeper",
                    "Chair Car",
                    "Executive"
                  ].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => handleClassFilter(cls)}
                      className={`p-2 rounded-xl text-center transition-all duration-200 border-2 ${
                        filters.classes.includes(cls)
                          ? 'bg-violet-600 text-white border-violet-600'
                          : 'bg-violet-50 text-gray-700 border-violet-400 hover:bg-violet-100 hover:border-violet-500'
                      }`}
                    >
                      <div className="text-xs font-bold">{cls}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
