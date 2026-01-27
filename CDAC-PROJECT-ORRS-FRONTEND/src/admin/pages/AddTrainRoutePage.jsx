import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import PrimaryButton from '../components/PrimaryButton';
import TrainRouteForm from '../components/TrainRouteForm';
import toast from 'react-hot-toast';

export default function AddTrainRoutePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trainId: '',
    stationId: '',
    arrivalTime: '',
    departureTime: '',
    stopNumber: '',
    distanceKm: '',
    platformNumber: ''
  });

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
      toast.success('Train Route added successfully!');
      navigate('/admin/train-routes');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Train Route</h1>
            <p className="text-gray-600">Create a new train route stop</p>
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
                Add Train Route
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}