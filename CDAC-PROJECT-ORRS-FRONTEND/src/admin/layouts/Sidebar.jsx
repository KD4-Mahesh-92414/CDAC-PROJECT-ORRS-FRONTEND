import { Link, useLocation } from 'react-router';
import train from '../../assets/train.png';
import { 
  HomeIcon, 
  RocketLaunchIcon, 
  BuildingOfficeIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon,
  SpeakerWaveIcon,
  XMarkIcon,
  ArrowLeftIcon,
  TruckIcon,
  MapIcon,
  ViewColumnsIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'User Management', href: '/admin/users', icon: UsersIcon },
  { name: 'Train Management', href: '/admin/trains', icon: RocketLaunchIcon },
  { name: 'Station Management', href: '/admin/stations', icon: BuildingOfficeIcon },
  { name: 'Coach Type Management', href: '/admin/coach-types', icon: TruckIcon },
  { name: 'Seat Layout Management', href: '/admin/seat-layouts', icon: ViewColumnsIcon },
  { name: 'Train Route Management', href: '/admin/train-routes', icon: MapIcon },
  { name: 'Fare Structure', href: '/admin/fares', icon: CurrencyDollarIcon },
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
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-md">
              <img src={train} alt="train logo" className="h-6 w-6 invert" />
            </div>
            <span className="text-xl font-bold text-violet-700">Admin Panel</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to User Portal
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden absolute top-6 right-6 p-1 rounded-md hover:bg-gray-100"
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
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
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