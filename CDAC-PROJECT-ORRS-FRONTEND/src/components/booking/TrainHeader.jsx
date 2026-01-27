import { MapIcon } from "@heroicons/react/24/outline";

/**
 * TrainHeader Component
 * Responsibility: Display train number, name, days of run, and route button
 */
export default function TrainHeader({ train }) {
  const daysOfRun = train.daysOfRun || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <div className="flex items-baseline gap-3 mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {train.number}
          </h3>
          <p className="text-base text-gray-600 font-medium">{train.name}</p>
        </div>
        
        {/* Days of Run */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Runs on:</span>
          <div className="flex gap-1">
            {daysOfRun.map((day, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-md"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-600 font-medium rounded-xl text-sm hover:bg-violet-200 transition-colors">
        <MapIcon className="w-4 h-4" />
        Route
      </button>
    </div>
  );
}