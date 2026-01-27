import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

/**
 * ClassOptions Component
 * Responsibility: Display available travel classes with pricing, availability, and selection
 */
export default function ClassOptions({ coaches, onCoachSelect }) {
  const [selectedCoach, setSelectedCoach] = useState(null);

  const handleCoachSelection = (coach) => {
    setSelectedCoach(coach);
    onCoachSelect?.(coach);
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
        Available Classes
      </h4>
      
      {coaches.map((coach, idx) => (
        <div
          key={idx}
          onClick={() => handleCoachSelection(coach)}
          className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            selectedCoach?.type === coach.type
              ? 'border-violet-500 bg-violet-50 shadow-md'
              : 'border-violet-200 hover:border-violet-300 hover:bg-violet-25'
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedCoach?.type === coach.type
                ? 'border-violet-500 bg-violet-500'
                : 'border-violet-300'
            }`}>
              {selectedCoach?.type === coach.type && (
                <CheckCircleIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {coach.type}
              </p>
              <p className="text-xs text-gray-600">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  coach.available > 50 ? 'bg-green-500' : 
                  coach.available > 20 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></span>
                {coach.available} seats available
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-violet-600">
              ₹{coach.fare}
            </p>
            <p className="text-xs text-gray-500">per person</p>
          </div>
        </div>
      ))}
    </div>
  );
}