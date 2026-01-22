import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import PrimaryButton from '../components/PrimaryButton';

export default function StationManagement() {
  const [stations, setStations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [formData, setFormData] = useState({
    station_code: '',
    station_name: '',
    city: '',
    state: '',
    zone: '',
    platforms: '',
    status: 'Active'
  });

  const columns = [
    { key: 'station_code', label: 'Station Code' },
    { key: 'station_name', label: 'Station Name' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zone', label: 'Zone' },
    { key: 'platforms', label: 'Platforms' },
    { 
      key: 'status', 
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
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await fetch('/api/admin/stations');
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
      // Fallback to mock data
      setStations([
        {
          station_id: 1,
          station_code: 'NDLS',
          station_name: 'New Delhi',
          city: 'Delhi',
          state: 'Delhi',
          zone: 'Northern Railway',
          platforms: 16,
          status: 'Active'
        },
        {
          station_id: 2,
          station_code: 'CSMT',
          station_name: 'Chhatrapati Shivaji Maharaj Terminus',
          city: 'Mumbai',
          state: 'Maharashtra',
          zone: 'Central Railway',
          platforms: 18,
          status: 'Active'
        }
      ]);
    }
  };

  const handleAdd = () => {
    setSelectedStation(null);
    setFormData({
      station_code: '',
      station_name: '',
      city: '',
      state: '',
      zone: '',
      platforms: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEdit = (station) => {
    setSelectedStation(station);
    setFormData(station);
    setShowModal(true);
  };

  const handleDelete = (station) => {
    setSelectedStation(station);
    setShowDeleteDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = selectedStation ? `/api/admin/stations/${selectedStation.station_id}` : '/api/admin/stations';
      const method = selectedStation ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        await fetchStations();
        setShowModal(false);
      } else {
        console.error('Failed to save station');
      }
    } catch (error) {
      console.error('Error saving station:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/admin/stations/${selectedStation.station_id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchStations();
        setShowDeleteDialog(false);
      } else {
        console.error('Failed to delete station');
      }
    } catch (error) {
      console.error('Error deleting station:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and paginate stations
  const filteredStations = stations.filter(station =>
    station.station_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.station_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStations = filteredStations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Station Management</h1>
            <p className="text-gray-600">Manage railway stations and their details</p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <PrimaryButton onClick={handleAdd}>
              Add Station
            </PrimaryButton>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={paginatedStations}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStations.length)} of {filteredStations.length} results
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        <FormModal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={selectedStation ? 'Edit Station' : 'Add Station'}
          onSubmit={handleSubmit}
          loading={loading}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Station Code *
              </label>
              <input
                type="text"
                required
                value={formData.station_code}
                onChange={(e) => setFormData({...formData, station_code: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Station Name *
              </label>
              <input
                type="text"
                required
                value={formData.station_name}
                onChange={(e) => setFormData({...formData, station_name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zone
              </label>
              <input
                type="text"
                value={formData.zone}
                onChange={(e) => setFormData({...formData, zone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platforms
              </label>
              <input
                type="number"
                value={formData.platforms}
                onChange={(e) => setFormData({...formData, platforms: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>
          </div>
        </FormModal>

        {/* Delete Confirmation */}
        <ConfirmDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
          title="Delete Station"
          message={`Are you sure you want to delete ${selectedStation?.station_name}?`}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
}