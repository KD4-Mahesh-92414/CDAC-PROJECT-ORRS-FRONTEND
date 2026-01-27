import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * EmptyTrainsState Component
 * Responsibility: Display message when no trains are found
 */
export default function EmptyTrainsState() {
  return (
    <div className="text-center py-12 bg-white border-2 border-violet-100 rounded-2xl">
      <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MagnifyingGlassIcon className="w-12 h-12 text-violet-600" />
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-2">No trains found</p>
      <p className="text-gray-600">Try adjusting your search criteria or filters</p>
    </div>
  );
}