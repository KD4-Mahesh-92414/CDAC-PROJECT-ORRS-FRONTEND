import { EyeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminLayout from '../layouts/AdminLayout';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import PrimaryButton from '../components/PrimaryButton';
import TrainRouteForm from '../components/TrainRouteForm';
import { useTrains } from '../context/TrainContext';
import { useStations } from '../context/StationContext';
import toast from 'react-hot-toast';

export default function TrainRouteListPage() {
  const navigate = useNavigate();
  const { trains } = useTrains();
  const { stations } = useStations();
  
  const [trainRoutes] = useState([
    {
      id: 1,
      trainId: 1,
      stationId: 1,
      arrivalTime: '08:00',
      departureTime: '08:05',
      stopNumber: 1,
      distanceKm: 0,
      platformNumber: '1'
    },
    {
      id: 2,
      trainId: 1,
      stationId: 2,
      arrivalTime: '12:30',
      departureTime: '12:35',
      stopNumber: 2,
      distanceKm: 450,
      platformNumber: '3'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [formData, setFormData] = useState({
    trainId: '',
    stationId: '',
    arrivalTime: '',
    departureTime: '',
    stopNumber: '',
    distanceKm: '',
    platformNumber: ''
  });

  const getTrainName = (trainId) => {
    const train = trains.find(t => t.trainId === trainId);
    return train ? `${train.trainNumber} - ${train.trainName}` : 'N/A';
  };

  const getStationName = (stationId) => {
    const station = stations.find(s => s.stationId === stationId);
    return station ? `${station.stationCode} - ${station.stationName}` : 'N/A';
  };

  const columns = [
    { 
      key: 'trainId', 
      label: 'Train',
      render: (value) => getTrainName(value)
    },
    { 
      key: 'stationId', 
      label: 'Station',
      render: (value) => getStationName(value)
    },
    { key: 'stopNumber', label: 'Stop #' },
    { key: 'arrivalTime', label: 'Arrival' },
    { key: 'departureTime', label: 'Departure' },
    { 
      key: 'distanceKm', 
      label: 'Distance (KM)',
      render: (value) => value ? `${value} km` : '-'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/admin/train-routes/view/${row.id}`)}
            className="text-blue-600 hover:text-blue-900"
            title="View"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

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

  const handleAdd = () => {
    setSelectedRoute(null);
    setFormData({
      trainId: '',
      stationId: '',
      arrivalTime: '',
      departureTime: '',
      stopNumber: '',
      distanceKm: '',
      platformNumber: ''
    });
    setShowModal(true);
  };

  const handleEdit = (route) => {
    setSelectedRoute(route);
    setFormData(route);
    setShowModal(true);
  };

  const handleDelete = (route) => {
    setSelectedRoute(route);
    setShowDeleteDialog(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success(selectedRoute ? 'Train Route updated successfully!' : 'Train Route added successfully!');
      setShowModal(false);
    }
  };

  const confirmDelete = () => {
    toast.success('Train Route deleted successfully!');
    setShowDeleteDialog(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Train Route Management</h1>
            <p className="text-gray-600">Manage train routes and station stops</p>
          </div>
          <PrimaryButton onClick={handleAdd}>
            Add Train Route
          </PrimaryButton>
        </div>

        <DataTable
          columns={columns}
          data={trainRoutes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
        />

        <FormModal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={selectedRoute ? 'Edit Train Route' : 'Add Train Route'}
          onSubmit={handleSubmit}
        >
          <TrainRouteForm
            formData={formData}
            setFormData={setFormData}
          />
        </FormModal>

        <ConfirmDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
          title="Delete Train Route"
          message={`Are you sure you want to delete this train route?`}
        />
      </div>
    </AdminLayout>
  );
}