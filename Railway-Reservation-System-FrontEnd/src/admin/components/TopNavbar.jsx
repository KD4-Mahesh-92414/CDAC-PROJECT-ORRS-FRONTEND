import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function TopNavbar({ setSidebarOpen }) {
  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
          <h2 className="ml-2 text-lg font-semibold text-gray-900">
            Railway Admin Dashboard
          </h2>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <UserCircleIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}