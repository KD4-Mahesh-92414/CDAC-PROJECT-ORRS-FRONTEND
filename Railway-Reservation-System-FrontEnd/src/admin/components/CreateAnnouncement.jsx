import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import PrimaryButton from '../components/PrimaryButton';

export default function CreateAnnouncement() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    audience_type: 'All',
    priority: 'Medium',
    valid_from: '',
    valid_to: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to create announcement
      console.log('Creating announcement:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setFormData({
        title: '',
        message: '',
        audience_type: 'All',
        priority: 'Medium',
        valid_from: '',
        valid_to: '',
        is_active: true
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Announcement</h1>
          <p className="text-gray-600">Broadcast important messages to users</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Announcement created successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Enter announcement title"
                maxLength="150"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.title.length}/150 characters
              </p>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Enter detailed announcement message"
              />
            </div>

            {/* Audience Type */}
            <div>
              <label htmlFor="audience_type" className="block text-sm font-medium text-gray-700 mb-2">
                Audience Type
              </label>
              <select
                id="audience_type"
                name="audience_type"
                value={formData.audience_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="All">All Users</option>
                <option value="User">Customers Only</option>
                <option value="Admin">Admins Only</option>
                <option value="Manager">Managers Only</option>
                <option value="Vendor">Vendors Only</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                High priority announcements will be displayed prominently
              </p>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="valid_from" className="block text-sm font-medium text-gray-700 mb-2">
                  Valid From
                </label>
                <input
                  type="datetime-local"
                  id="valid_from"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label htmlFor="valid_to" className="block text-sm font-medium text-gray-700 mb-2">
                  Valid To
                </label>
                <input
                  type="datetime-local"
                  id="valid_to"
                  name="valid_to"
                  value={formData.valid_to}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                Publish immediately
              </label>
            </div>

            {/* Preview */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
              <div className={`p-4 rounded-lg border-l-4 ${
                formData.priority === 'High' ? 'bg-red-50 border-red-400' :
                formData.priority === 'Medium' ? 'bg-yellow-50 border-yellow-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {formData.title || 'Announcement Title'}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    formData.priority === 'High' ? 'bg-red-100 text-red-800' :
                    formData.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {formData.priority}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  {formData.message || 'Announcement message will appear here...'}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Target: {formData.audience_type}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <PrimaryButton
                type="submit"
                loading={loading}
                className="px-8"
              >
                {loading ? 'Publishing...' : 'Publish Announcement'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}