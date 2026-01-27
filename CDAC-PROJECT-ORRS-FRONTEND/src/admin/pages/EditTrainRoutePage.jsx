import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import PrimaryButton from '../components/PrimaryButton';
import TrainRouteForm from '../components/TrainRouteForm';
import toast from 'react-hot-toast';

export default function EditTrainRoutePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    trainId: '',
    stationId: '',
    arrivalTime: '',
    departureTime: '',
    stopNumber: '',
    distanceKm: '',
    platformNumber: ''
  });
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
    
    setFormData(mockRoute);
    setLoading(false);
  }, [id]);

  const validateForm = () => {
    if (!formData.trainId) {
      toast.error('Please select a train');
      return false;
    }
    if (!formData.stationId) {
      toast.error('Please select a station');
      return false;
    }
    if (!formData.departureTime) {
      toast.error('Departure time is required');
      return false;
    }
    if (!formData.stopNumber || formData.stopNumber <= 0) {
      toast.error('Stop number must be greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Train Route updated successfully!');
      navigate('/admin/train-routes');
    }
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Train Route</h1>
            <p className="text-gray-600">Update train route stop details</p>
          </div>
          <PrimaryButton 
            variant="secondary" 
            onClick={() => navigate('/admin/train-routes')}
          >
            Back to List
          </PrimaryButton>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <TrainRouteForm
              formData={formData}
              setFormData={setFormData}
            />
            
            <div className="flex justify-end space-x-3">
              <PrimaryButton 
                type="button" 
                variant="secondary"
                onClick={() => navigate('/admin/train-routes')}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton type="submit">
                Update Train Route
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}