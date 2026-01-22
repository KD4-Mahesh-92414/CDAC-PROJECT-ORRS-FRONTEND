import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import PrimaryButton from '../components/PrimaryButton';

export default function TrainManagement() {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [formData, setFormData] = useState({
    train_number: '',
    train_name: '',
    train_type: '',
    source_station_id: '',
    destination_station_id: '',
    total_distance_km: '',
    avg_speed: '',
    days_of_run: '',
    train_active_status: 'Active',
    status: 'Not Started'
  });

  const columns = [
    { key: 'train_number', label: 'Train Number' },
    { key: 'train_name', label: 'Train Name' },
    { key: 'train_type', label: 'Type' },
    { key: 'source_station', label: 'Source' },
    { key: 'destination_station', label: 'Destination' },
    { key: 'total_distance_km', label: 'Distance (km)' },
    { key: 'days_of_run', label: 'Running Days' },
    { 
      key: 'train_active_status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  useEffect(() => {
    // Mock data - replace with API calls
    setStations([
      { station_id: 1, station_name: 'New Delhi', station_code: 'NDLS' },
      { station_id: 2, station_name: 'Mumbai Central', station_code: 'BCT' }
    ]);

    setTrains([
      {
        train_id: 1,
        train_number: '12951',
        train_name: 'Mumbai Rajdhani Express',
        train_type: 'Rajdhani',
        source_station_id: 1,
        source_station: 'New Delhi',
        destination_station_id: 2,
        destination_station: 'Mumbai Central',
        total_distance_km: 1384,
        avg_speed: 85,
        days_of_run: 'Daily',
        train_active_status: 'Active',
        status: 'Running'
      }
    ]);
  }, []);

  const handleAdd = () => {
    setSelectedTrain(null);
    setFormData({
      train_number: '',
      train_name: '',
      train_type: '',
      source_station_id: '',
      destination_station_id: '',
      total_distance_km: '',
      avg_speed: '',
      days_of_run: '',
      train_active_status: 'Active',
      status: 'Not Started'
    });
    setShowModal(true);
  };

  const handleEdit = (train) => {
    setSelectedTrain(train);
    setFormData({
      train_number: train.train_number,
      train_name: train.train_name,
      train_type: train.train_type,
      source_station_id: train.source_station_id,
      destination_station_id: train.destination_station_id,
      total_distance_km: train.total_distance_km,
      avg_speed: train.avg_speed,
      days_of_run: train.days_of_run,
      train_active_status: train.train_active_status,
      status: train.status
    });
    setShowModal(true);
  };

  const handleDelete = (train) => {
    setSelectedTrain(train);
    setShowDeleteDialog(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving train:', formData);
    setShowModal(false);
  };

  const confirmDelete = () => {
    console.log('Deleting train:', selectedTrain);
    setShowDeleteDialog(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Train Management</h1>
            <p className="text-gray-600">Manage trains and their schedules</p>
          </div>
          <PrimaryButton onClick={handleAdd}>
            Add Train
          </PrimaryButton>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={trains}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add/Edit Modal */}
        <FormModal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={selectedTrain ? 'Edit Train' : 'Add Train'}
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Train Number *
              </label>
              <input
                type="text"
                required
                value={formData.train_number}
                onChange={(e) => setFormData({...formData, train_number: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Train Name *
              </label>
              <input
                type="text"
                required
                value={formData.train_name}
                onChange={(e) => setFormData({...formData, train_name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Train Type
              </label>
              <input
                type="text"
                value={formData.train_type}
                onChange={(e) => setFormData({...formData, train_type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Express, Rajdhani, Shatabdi, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source Station
              </label>
              <select
                value={formData.source_station_id}
                onChange={(e) => setFormData({...formData, source_station_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select Source Station</option>
                {stations.map(station => (
                  <option key={station.station_id} value={station.station_id}>
                    {station.station_name} ({station.station_code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination Station
              </label>
              <select
                value={formData.destination_station_id}
                onChange={(e) => setFormData({...formData, destination_station_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select Destination Station</option>
                {stations.map(station => (
                  <option key={station.station_id} value={station.station_id}>
                    {station.station_name} ({station.station_code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Distance (km)
              </label>
              <input
                type="number"
                value={formData.total_distance_km}
                onChange={(e) => setFormData({...formData, total_distance_km: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Speed (km/h)
              </label>
              <input
                type="number"
                value={formData.avg_speed}
                onChange={(e) => setFormData({...formData, avg_speed: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days of Run
              </label>
              <input
                type="text"
                value={formData.days_of_run}
                onChange={(e) => setFormData({...formData, days_of_run: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Daily, Mon-Wed-Fri, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Active Status
              </label>
              <select
                value={formData.train_active_status}
                onChange={(e) => setFormData({...formData, train_active_status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Running">Running</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>
          </div>
        </FormModal>

        {/* Delete Confirmation */}
        <ConfirmDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
          title="Delete Train"
          message={`Are you sure you want to delete ${selectedTrain?.train_name}?`}
        />
      </div>
    </AdminLayout>
  );
}