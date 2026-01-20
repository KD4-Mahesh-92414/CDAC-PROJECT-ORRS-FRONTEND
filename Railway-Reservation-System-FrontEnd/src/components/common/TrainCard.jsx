import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function TrainCard({ train, onSelect }) {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('SL');

  const handleBookNow = () => {
    onSelect(train, selectedClass);
    navigate('/seats');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-violet-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{train.name}</h3>
          <p className="text-sm text-gray-600">#{train.number}</p>
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mt-2">
            {train.runsOn}
          </span>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-violet-100 text-violet-800 text-xs font-medium rounded-full">
            {train.type}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{train.departure}</p>
          <p className="text-sm text-gray-600 mt-1">{train.from}</p>
        </div>
        <div className="flex-1 mx-6">
          <div className="flex items-center justify-center relative">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-violet-400 to-blue-400"></div>
            <div className="mx-3 px-3 py-1 bg-white rounded-full border border-violet-200 text-sm font-medium text-gray-700">
              {train.duration}
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{train.arrival}</p>
          <p className="text-sm text-gray-600 mt-1">{train.to}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {train.classes.map((cls) => (
          <button
            key={cls.code}
            onClick={() => setSelectedClass(cls.code)}
            className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
              selectedClass === cls.code
                ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md transform scale-105'
                : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'
            }`}
          >
            <p className="font-bold text-sm">{cls.code}</p>
            <p className="text-lg font-bold text-violet-600">₹{cls.price}</p>
            <p className="text-xs text-green-600">{cls.available} Available</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Selected: <span className="font-semibold">{selectedClass}</span></p>
          <p className="text-xl font-bold text-violet-600">
            ₹{train.classes.find(c => c.code === selectedClass)?.price}
          </p>
        </div>
        <button
          onClick={handleBookNow}
          className="px-8 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-violet-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}