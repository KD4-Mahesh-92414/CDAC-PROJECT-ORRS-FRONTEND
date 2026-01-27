import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import PrimaryButton from '../components/PrimaryButton';
import { useTrains } from '../context/TrainContext';
import { useStations } from '../context/StationContext';

export default function ViewTrainRoutePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { trains } = useTrains();
  const { stations } = useStations();
  const [trainRoute, setTrainRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const mockRoute = {
      id: 1,
      trainId: 1,
      stationId: 1,
      arrivalTime: '08:00',
      departureTime: '08:05',
      stopNumber: 1,
      distanceKm: 0,
      platformNumber: '1'
    };
    
    setTrainRoute(mockRoute);
    setLoading(false);
  }, [id]);

  const getTrainName = (trainId) => {
    const train = trains.find(t => t.trainId === trainId);
    return train ? `${train.trainNumber} - ${train.trainName}` : 'N/A';
  };

  const getStationName = (stationId) => {
    const station = stations.find(s => s.stationId === stationId);
    return station ? `${station.stationCode} - ${station.stationName}` : 'N/A';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!trainRoute) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Train Route Not Found</h2>
          <PrimaryButton 
            onClick={() => navigate('/admin/train-routes')}
            className="mt-4"
          >
            Back to List
          </PrimaryButton>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Train Route Details</h1>
            <p className="text-gray-600">View train route stop information</p>
          </div>
          <div className="flex space-x-3">
            <PrimaryButton 
              onClick={() => navigate(`/admin/train-routes/edit/${id}`)}
            >
              Edit
            </PrimaryButton>
            <PrimaryButton 
              variant="secondary" 
              onClick={() => navigate('/admin/train-routes')}
            >
              Back to List
            </PrimaryButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Train
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {getTrainName(trainRoute.trainId)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Station
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {getStationName(trainRoute.stationId)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Stop Number
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {trainRoute.stopNumber}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Platform Number
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {trainRoute.platformNumber || 'Not specified'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Arrival Time
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {trainRoute.arrivalTime || 'Not specified'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Departure Time
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {trainRoute.departureTime}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Distance (KM)
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {trainRoute.distanceKm ? `${trainRoute.distanceKm} km` : 'Not specified'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}