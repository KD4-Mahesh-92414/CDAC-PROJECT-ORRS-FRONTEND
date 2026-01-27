import { useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TrainHeader from './TrainHeader';
import JourneyTimeline from './JourneyTimeline';
import ClassOptions from './ClassOptions';
import CoachImageDisplay from './CoachImageDisplay';

/**
 * TrainCard Component
 * Responsibility: Display individual train information and handle train selection
 */
export default function TrainCard({ train, onSelectTrain }) {
  const [selectedCoach, setSelectedCoach] = useState(null);

  const handleCoachSelect = (coach) => {
    setSelectedCoach(coach);
  };

  const handleProceed = () => {
    if (selectedCoach && onSelectTrain) {
      onSelectTrain({ ...train, selectedCoach: selectedCoach });
    }
  };

  return (
    <div className="bg-white border-2 border-violet-300 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-violet-500">
      <TrainHeader train={train} />
      <JourneyTimeline train={train} />
      
      {/* Coach Selection Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Options - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ClassOptions 
            coaches={train.coaches} 
            onCoachSelect={handleCoachSelect}
          />
        </div>
        
        {/* Coach Image Display and Proceed Button - Takes 1 column */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <CoachImageDisplay 
            selectedCoachType={selectedCoach?.type} 
          />
          
          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="mt-4 w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-violet-700 hover:to-violet-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:from-gray-400 disabled:hover:to-gray-400"
            disabled={!selectedCoach}
          >
            <span>Proceed</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}