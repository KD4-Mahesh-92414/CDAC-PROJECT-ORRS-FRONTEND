import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import PrimaryButton from '../components/PrimaryButton';

export default function ViewCoachTypePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coachType, setCoachType] = useState(null);
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
    
    setCoachType(mockCoachType);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!coachType) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Coach Type Not Found</h2>
          <PrimaryButton 
            onClick={() => navigate('/admin/coach-types')}
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
            <h1 className="text-2xl font-bold text-gray-900">Coach Type Details</h1>
            <p className="text-gray-600">View coach type information</p>
          </div>
          <div className="flex space-x-3">
            <PrimaryButton 
              onClick={() => navigate(`/admin/coach-types/edit/${id}`)}
            >
              Edit
            </PrimaryButton>
            <PrimaryButton 
              variant="secondary" 
              onClick={() => navigate('/admin/coach-types')}
            >
              Back to List
            </PrimaryButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Type Code
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {coachType.typeCode}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Type Name
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {coachType.typeName}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {coachType.description || 'No description provided'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Total Seats
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {coachType.totalSeats}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Coach Image URL
              </label>
              <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                {coachType.coachImageUrl || 'No image URL provided'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}