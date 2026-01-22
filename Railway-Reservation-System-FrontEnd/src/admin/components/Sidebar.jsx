import { Link, useLocation } from 'react-router';
import { 
  HomeIcon, 
  RocketLaunchIcon, 
  BuildingOfficeIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon,
  SpeakerWaveIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Train Management', href: '/admin/trains', icon: RocketLaunchIcon },
  { name: 'Station Management', href: '/admin/stations', icon: BuildingOfficeIcon },
  { name: 'User Management', href: '/admin/users', icon: UsersIcon },
  { name: 'Fair Structure', href: '/admin/fares', icon: CurrencyDollarIcon },
  { name: 'Refund Transaction', href: '/admin/refunds', icon: ArrowPathIcon },
  { name: 'Create Announcement', href: '/admin/announcements', icon: SpeakerWaveIcon },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } lg:block`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-bold text-violet-600">Admin Panel</h1>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}