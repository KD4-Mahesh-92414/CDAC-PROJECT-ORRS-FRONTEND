import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import PrimaryButton from '../components/PrimaryButton';

export default function FareStructure() {
  const [fares, setFares] = useState([]);
  const [trains, setTrains] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFare, setSelectedFare] = useState(null);
  const [formData, setFormData] = useState({
    train_id: '',
    coach_type: '',
    rate_per_km: '',
    min_fare: '50.00',
    is_active: true
  });

  const columns = [
    { key: 'train_name', label: 'Train' },
    { key: 'train_number', label: 'Train Number' },
    { 
      key: 'coach_type', 
      label: 'Coach Type',
      render: (value) => (
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          {value}
        </span>
      )
    },
    { 
      key: 'rate_per_km', 
      label: 'Rate per KM',
      render: (value) => `₹${value}`
    },
    { 
      key: 'min_fare', 
      label: 'Minimum Fare',
      render: (value) => `₹${value}`
    },
    { 
      key: 'is_active', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  useEffect(() => {
    // Mock data - replace with API calls
    setTrains([
      { train_id: 1, train_name: 'Mumbai Rajdhani Express', train_number: '12951' },
      { train_id: 2, train_name: 'Shatabdi Express', train_number: '12002' }
    ]);

    setFares([
      {
        fare_id: 1,
        train_id: 1,
        train_name: 'Mumbai Rajdhani Express',
        train_number: '12951',
        coach_type: '3A',
        rate_per_km: '2.50',
        min_fare: '50.00',
        is_active: true
      },
      {
        fare_id: 2,
        train_id: 1,
        train_name: 'Mumbai Rajdhani Express',
        train_number: '12951',
        coach_type: '2A',
        rate_per_km: '3.75',
        min_fare: '75.00',
        is_active: true
      }
    ]);
  }, []);

  const handleAdd = () => {
    setSelectedFare(null);
    setFormData({
      train_id: '',
      coach_type: '',
      rate_per_km: '',
      min_fare: '50.00',
      is_active: true
    });
    setShowModal(true);
  };

  const handleEdit = (fare) => {
    setSelectedFare(fare);
    setFormData({
      train_id: fare.train_id,
      coach_type: fare.coach_type,
      rate_per_km: fare.rate_per_km,
      min_fare: fare.min_fare,
      is_active: fare.is_active
    });
    setShowModal(true);
  };

  const handleDelete = (fare) => {
    setSelectedFare(fare);
    setShowDeleteDialog(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving fare:', formData);
    setShowModal(false);
  };

  const confirmDelete = () => {
    console.log('Deleting fare:', selectedFare);
    setShowDeleteDialog(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fare Structure</h1>
            <p className="text-gray-600">Manage train fare rates by coach type</p>
          </div>
          <PrimaryButton onClick={handleAdd}>
            Add Fare Rule
          </PrimaryButton>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={fares}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add/Edit Modal */}
        <FormModal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={selectedFare ? 'Edit Fare Rule' : 'Add Fare Rule'}
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Train *
              </label>
              <select
                required
                value={formData.train_id}
                onChange={(e) => setFormData({...formData, train_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select Train</option>
                {trains.map(train => (
                  <option key={train.train_id} value={train.train_id}>
                    {train.train_number} - {train.train_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coach Type *
              </label>
              <select
                required
                value={formData.coach_type}
                onChange={(e) => setFormData({...formData, coach_type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select Coach Type</option>
                <option value="SL">Sleeper (SL)</option>
                <option value="3A">AC 3 Tier (3A)</option>
                <option value="2A">AC 2 Tier (2A)</option>
                <option value="1A">AC First Class (1A)</option>
                <option value="CC">Chair Car (CC)</option>
                <option value="2S">Second Sitting (2S)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate per KM (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.rate_per_km}
                onChange={(e) => setFormData({...formData, rate_per_km: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="2.50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Fare (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.min_fare}
                onChange={(e) => setFormData({...formData, min_fare: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="50.00"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
          </div>
        </FormModal>

        {/* Delete Confirmation */}
        <ConfirmDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
          title="Delete Fare Rule"
          message={`Are you sure you want to delete this fare rule?`}
        />
      </div>
    </AdminLayout>
  );
}