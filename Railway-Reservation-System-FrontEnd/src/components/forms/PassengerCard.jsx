import { useState } from "react";

const PassengerCard = ({ passengerNo, passenger, onPassengerChange }) => {
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'age':
        if (!value) {
          newErrors.age = 'Age is required';
        } else if (value < 1 || value > 120) {
          newErrors.age = 'Age must be between 1 and 120';
        } else {
          delete newErrors.age;
        }
        break;
      case 'country':
        if (!value.trim()) {
          newErrors.country = 'Country is required';
        } else {
          delete newErrors.country;
        }
        break;
      case 'gender':
        if (!value) {
          newErrors.gender = 'Gender is required';
        } else {
          delete newErrors.gender;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (field, value) => {
    onPassengerChange(passengerNo - 1, field, value);
    validateField(field, value);
  };

  return (
    <div className="bg-white border-2 border-violet-300 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-violet-300">
        Passenger {passengerNo}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Gender */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`gender-${passengerNo}`}
                value="Male"
                checked={passenger.gender === "Male"}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-4 h-4 text-violet-600 border-gray-300 focus:ring-violet-500"
              />
              <span className="text-sm text-gray-700">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`gender-${passengerNo}`}
                value="Female"
                checked={passenger.gender === "Female"}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-4 h-4 text-violet-600 border-gray-300 focus:ring-violet-500"
              />
              <span className="text-sm text-gray-700">Female</span>
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>

        {/* Name */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={passenger.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.name 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-violet-400 focus:border-violet-600'
            }`}
            placeholder="Enter full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Age */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={passenger.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.age 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-violet-400 focus:border-violet-600'
            }`}
            placeholder="Age"
            min="1"
            max="120"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        {/* Country */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={passenger.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.country 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-violet-400 focus:border-violet-600'
            }`}
            placeholder="Country"
          />
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>
      </div>
    </div>
  );
};

export default PassengerCard;