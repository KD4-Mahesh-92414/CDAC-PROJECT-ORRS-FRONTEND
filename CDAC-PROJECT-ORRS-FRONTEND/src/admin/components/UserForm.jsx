import { useState, useEffect } from 'react';
import { AdminInput, AdminSelect, PrimaryButton } from './index';

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' }
];

const ROLE_OPTIONS = [
  { value: 'ROLE_CUSTOMER', label: 'Customer' },
  { value: 'ROLE_MANAGER', label: 'Manager' },
  { value: 'ROLE_ADMIN', label: 'Admin' }
];

const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'SUSPENDED', label: 'Suspended' }
];

export default function UserForm({ user, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    gender: '',
    role: 'ROLE_CUSTOMER',
    status: 'ACTIVE',
    aadharNo: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        mobile: user.mobile || '',
        gender: user.gender || '',
        role: user.role || 'ROLE_CUSTOMER',
        status: user.status || 'ACTIVE',
        aadharNo: user.aadharNo || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Ensure empty strings are sent as null for optional fields
      const submitData = {
        ...formData,
        aadharNo: formData.aadharNo.trim() || null,
        address: formData.address.trim() || null
      };
      console.log('Submitting user data:', submitData);
      onSubmit(submitData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <AdminInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <AdminInput
          label="Mobile Number"
          value={formData.mobile}
          onChange={(e) => handleChange('mobile', e.target.value)}
          error={errors.mobile}
          placeholder="10-digit mobile number"
          required
        />

        <AdminSelect
          label="Gender"
          value={formData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          options={GENDER_OPTIONS}
          error={errors.gender}
          placeholder="Select gender"
          required
        />

        <AdminSelect
          label="Role"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          options={ROLE_OPTIONS}
          error={errors.role}
          placeholder="Select role"
          required
        />

        <AdminSelect
          label="Status"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          options={STATUS_OPTIONS}
          error={errors.status}
          placeholder="Select status"
          required
        />

        <AdminInput
          label="Aadhar Number"
          value={formData.aadharNo}
          onChange={(e) => handleChange('aadharNo', e.target.value)}
          placeholder="12-digit Aadhar number (optional)"
        />
      </div>

      <AdminInput
        label="Address"
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        placeholder="Full address (optional)"
        multiline
        rows={3}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <PrimaryButton
          type="submit"
          loading={loading}
        >
          {user ? 'Update User' : 'Create User'}
        </PrimaryButton>
      </div>
    </form>
  );
}