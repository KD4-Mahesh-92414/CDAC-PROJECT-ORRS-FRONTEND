import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPassengers } from "../../store/slices/bookingSlice";
import PassengerCard from "../../components/forms/PassengerCard";
import toast from "react-hot-toast";



export default function PassengerDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTrain, selectedSeats, passengers, fareData } = useSelector((state) => state.booking);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    paymentMode: "UPI",
  });

  useEffect(() => {
    if (!selectedTrain || selectedSeats.length === 0) {
      navigate("/");
      return;
    }

    // Initialize with existing passengers or empty forms
    if (passengers.length === 0) {
      const newPassengers = Array(selectedSeats.length)
        .fill(null)
        .map((_, i) => ({
          id: i,
          name: "",
          age: "",
          gender: "Male",
          country: "India",
        }));
      dispatch(setPassengers(newPassengers));
    }
  }, [selectedTrain, selectedSeats, navigate, passengers, dispatch]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    dispatch(setPassengers(updatedPassengers));
  };

  const handleContinue = () => {
    const allFilled = passengers.every(
      (p) => p.name && p.age && p.gender && p.country
    );
    const validEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      contactInfo.email
    );

    if (!allFilled) {
      toast.error("Please fill in all passenger details");
      return;
    }

    if (!validEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Passenger details saved successfully!");
    navigate("/review");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Journey Info Card - Using Vineet's structure */}
      <div className="bg-yellow-100 rounded-xl p-6 border border-yellow-200">
        <div className="flex justify-between items-center">
          {/* Left - Departure */}
          <div>
            <p className="text-xl font-bold text-gray-900">{selectedTrain?.departureTime || "17:45 PM"}</p>
            <p className="text-sm text-gray-600">{selectedTrain?.departureStation || "Departure Station"}</p>
            <p className="text-xs text-gray-500 mt-1">{selectedTrain?.departureDate || "23 Oct 2025"}</p>
          </div>

          {/* Center - Duration with enhanced timeline */}
          <div className="flex-1 mx-6">
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-violet-600"></div>
              <div className="flex-1 border-t-8 border-violet-600 mx-2"></div>
              <div className="mx-3 text-gray-600 font-bold text-sm bg-white px-3 py-1 rounded-full border border-gray-300">
                {selectedTrain?.duration || "6.25 Hrs"}
              </div>
              <div className="flex-1 border-t-8 border-violet-600 mx-2"></div>
              <svg className="w-6 h-6 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Right - Arrival */}
          <div>
            <p className="text-xl font-bold text-gray-900">{selectedTrain?.arrivalTime || "12:10 AM"}</p>
            <p className="text-sm text-gray-600">{selectedTrain?.arrivalStation || "Arrival Station"}</p>
            <p className="text-xs text-gray-500 mt-1">{selectedTrain?.arrivalDate || "24 Oct 2025"}</p>
          </div>

          {/* Train Info */}
          <div className="text-right ml-6">
            <p className="text-2xl font-bold text-violet-600">{selectedTrain?.number || "15065"}</p>
            <p className="text-sm text-gray-700">{selectedTrain?.name || "Express Train"}</p>
            <p className="text-xs text-green-600 font-medium mt-1">Seats Available - {selectedTrain?.coaches?.[0]?.available || "356"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Passengers Form */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Passenger Details</h2>
            <p className="text-gray-600">Fill details for {selectedSeats.length} passenger{selectedSeats.length > 1 ? 's' : ''}</p>
          </div>
          
          <div className="space-y-4">
            {passengers.map((passenger, index) => (
              <PassengerCard
                key={index}
                passengerNo={index + 1}
                passenger={passenger}
                onPassengerChange={handlePassengerChange}
              />
            ))}
          </div>
        </div>

        {/* Contact Info & Summary Sidebar */}
        <div className="space-y-6">
          {/* Contact Information Card */}
          <div className="bg-white border-2 border-violet-300 rounded-2xl shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-violet-100">
              Contact & Payment
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-violet-400 rounded-xl focus:border-violet-600 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Booking confirmation will be sent here
                </p>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  {["UPI", "Debit/Credit Card", "Net Banking"].map((mode) => (
                    <label key={mode} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMode"
                        value={mode}
                        checked={contactInfo.paymentMode === mode}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            paymentMode: e.target.value,
                          })
                        }
                        className="w-4 h-4 text-violet-600 border-gray-300 focus:ring-violet-500"
                      />
                      <span className="text-sm text-gray-700">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fare Summary */}
              <div className="border-t border-violet-100 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Booking Summary</h4>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium text-gray-900">{passengers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Fare (per seat):</span>
                    <span className="font-medium text-gray-900">₹{fareData.farePerSeat || 2500}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees:</span>
                    <span className="font-medium text-gray-900">₹{fareData.taxes || Math.round(passengers.length * 2500 * 0.05)}</span>
                  </div>
                </div>

                <div className="bg-violet-50 rounded-xl p-4 border-l-4 border-violet-500 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-violet-600">
                      ₹{(fareData.totalFare || Math.round(passengers.length * 2500 * 1.05)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Proceed to Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
