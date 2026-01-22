import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import StatsCard from '../components/StatsCard';
import { 
  RocketLaunchIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeTrains: 0,
    totalPassengers: 0,
    revenueToday: 0,
    occupancyRate: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Replace with actual API calls
      const [trainsRes, passengersRes, revenueRes, occupancyRes] = await Promise.all([
        fetch('/api/admin/stats/trains'),
        fetch('/api/admin/stats/passengers'),
        fetch('/api/admin/stats/revenue'),
        fetch('/api/admin/stats/occupancy')
      ]);
      
      setStats({
        activeTrains: await trainsRes.json() || 245,
        totalPassengers: await passengersRes.json() || 12847,
        revenueToday: await revenueRes.json() || 2847500,
        occupancyRate: await occupancyRes.json() || 78.5
      });
    } catch (error) {
      // Fallback to mock data
      setStats({
        activeTrains: 245,
        totalPassengers: 12847,
        revenueToday: 2847500,
        occupancyRate: 78.5
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Railway system overview and statistics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Trains"
            value={stats.activeTrains}
            icon={RocketLaunchIcon}
            change="12"
            changeType="increase"
          />
          <StatsCard
            title="Total Passengers"
            value={stats.totalPassengers.toLocaleString()}
            icon={UsersIcon}
            change="8.2%"
            changeType="increase"
          />
          <StatsCard
            title="Revenue Today"
            value={`₹${(stats.revenueToday / 100000).toFixed(1)}L`}
            icon={CurrencyDollarIcon}
            change="15.3%"
            changeType="increase"
          />
          <StatsCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            icon={ChartBarIcon}
            change="2.1%"
            changeType="decrease"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Revenue Chart Placeholder</p>
            </div>
          </div>

          {/* Weekly Bookings Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Bookings</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Bookings Chart Placeholder</p>
            </div>
          </div>
        </div>

        {/* Train Status Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Train Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">189</p>
              <p className="text-sm text-green-700">Running</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-yellow-700">Delayed</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-sm text-red-700">Cancelled</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}