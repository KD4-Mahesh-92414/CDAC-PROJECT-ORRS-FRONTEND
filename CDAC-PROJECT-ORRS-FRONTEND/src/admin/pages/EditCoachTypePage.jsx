import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import PrimaryButton from '../components/PrimaryButton';
import CoachTypeForm from '../components/CoachTypeForm';
import toast from 'react-hot-toast';

export default function EditCoachTypePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    typeCode: '',
    typeName: '',
    description: '',
    totalSeats: '',
    coachImageUrl: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading - replace with actual API call
    const mockCoachType = {
      id: 1,
      typeCode: 'SL',
      typeName: 'Sleeper',
      description: 'Non-AC sleeper coach with berths',
      totalSeats: 72,
      coachImageUrl: ''
    };
    
    setFormData(mockCoachType);
    setLoading(false);
  }, [id]);

  const validateForm = () => {
    if (!formData.typeCode) {
      toast.error('Type Code is required');
      return false;
    }
    if (!formData.typeName) {
      toast.error('Type Name is required');
      return false;
    }
    if (!formData.totalSeats || formData.totalSeats <= 0) {
      toast.error('Total Seats must be greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Coach Type updated successfully!');
      navigate('/admin/coach-types');
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
            <h1 className="text-2xl font-bold text-gray-900">Edit Coach Type</h1>
            <p className="text-gray-600">Update coach type configuration</p>
          </div>
          <PrimaryButton 
            variant="secondary" 
            onClick={() => navigate('/admin/coach-types')}
          >
            Back to List
          </PrimaryButton>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <CoachTypeForm
              formData={formData}
              setFormData={setFormData}
            />
            
            <div className="flex justify-end space-x-3">
              <PrimaryButton 
                type="button" 
                variant="secondary"
                onClick={() => navigate('/admin/coach-types')}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton type="submit">
                Update Coach Type
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}