import { RectangleStackIcon } from "@heroicons/react/24/outline";

/**
 * CoachImageDisplay Component
 * Responsibility: Display coach images based on selected class type
 */
export default function CoachImageDisplay({ selectedCoachType }) {
  // Mock coach images - in real app, these would be actual image URLs
  const coachImages = {
    "AC 1st Tier": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop&crop=center",
    "AC 2nd Tier": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center", 
    "AC 3rd Tier": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&crop=center",
    "Sleeper Class": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&crop=center",
    "AC Chair Car": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop&crop=center",
    "Executive Chair": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop&crop=center"
  };

  if (!selectedCoachType) {
    return (
      <div className="bg-violet-50 rounded-lg p-4 text-center border-2 border-dashed border-violet-300">
        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <RectangleStackIcon className="w-5 h-5 text-violet-600" />
        </div>
        <p className="text-violet-600 font-medium text-xs">Select a class to view coach details</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border-2 border-violet-200 overflow-hidden">
      <div className="relative">
        <img 
          src={coachImages[selectedCoachType] || coachImages["AC 3rd Tier"]} 
          alt={selectedCoachType}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-violet-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            {selectedCoachType}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-gray-900 text-center text-sm">{selectedCoachType}</h4>
      </div>
    </div>
  );
}