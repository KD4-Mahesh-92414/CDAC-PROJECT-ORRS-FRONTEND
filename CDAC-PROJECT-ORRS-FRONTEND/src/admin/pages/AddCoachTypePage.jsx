import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import PrimaryButton from '../components/PrimaryButton';
import CoachTypeForm from '../components/CoachTypeForm';
import toast from 'react-hot-toast';

export default function AddCoachTypePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    typeCode: '',
    typeName: '',
    description: '',
    totalSeats: '',
    coachImageUrl: ''
  });

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
      toast.success('Coach Type added successfully!');
      navigate('/admin/coach-types');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Coach Type</h1>
            <p className="text-gray-600">Create a new coach type configuration</p>
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
                Add Coach Type
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}