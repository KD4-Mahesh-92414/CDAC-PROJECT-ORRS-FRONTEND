import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { BookingContext } from "../../contexts/BookingContext";

export default function ReservationReview() {
  const navigate = useNavigate();
  const { selectedTrain, selectedSeats, passengers, fareData } =
    useContext(BookingContext);

  useEffect(() => {
    if (
      !selectedTrain ||
      selectedSeats.length === 0 ||
      passengers.length === 0
    ) {
      navigate("/");
      return;
    }
  }, [selectedTrain, selectedSeats, passengers, navigate]);

  const totalFare = fareData.totalFare || Math.round(passengers.length * 2500 * 1.05);

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Journey Info Card - Using Vineet's structure */}
      <div className="bg-yellow-100 rounded-xl p-6 flex justify-between items-center border shadow-sm">
        {/* Left - Departure */}
        <div>
          <p className="text-xl font-bold text-gray-900">{selectedTrain?.departureTime || "17:45 PM"}</p>
          <p className="italic text-gray-700">{selectedTrain?.departureStation || "Departure Station"}</p>
          <p className="mt-2 text-sm text-gray-600">{selectedTrain?.departureDate || "23 Oct 2025"}</p>
        </div>

        {/* Center - Duration */}
        <div className="text-center">
          <p className="text-sm text-gray-600">{selectedTrain?.duration || "6.25 Hrs"}</p>
          <p className="text-2xl font-bold text-violet-600">→</p>
        </div>

        {/* Right - Arrival */}
        <div>
          <p className="text-xl font-bold text-gray-900">{selectedTrain?.arrivalTime || "12:10 AM"}</p>
          <p className="italic text-gray-700">{selectedTrain?.arrivalStation || "Arrival Station"}</p>
          <p className="mt-2 text-sm text-gray-600">{selectedTrain?.arrivalDate || "24 Oct 2025"}</p>
        </div>

        {/* Train Info */}
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{selectedTrain?.number || "15065"}</p>
          <p className="text-gray-700">{selectedTrain?.name || "Express Train"}</p>
          <p className="font-semibold mt-1 text-violet-600">Seats Available - {selectedTrain?.coaches?.[0]?.available || "356"}</p>
        </div>
      </div>

      {/* Passengers Section */}
      <div className="space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Passenger Details</h2>
          <p className="text-gray-600">Review details for {passengers.length} passenger{passengers.length > 1 ? 's' : ''}</p>
        </div>
        
        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="bg-white border-2 border-violet-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Passenger {index + 1}</p>
                  <p className="text-lg font-bold text-gray-900">{passenger.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Gender</p>
                  <p className="font-semibold text-gray-900">{passenger.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Age</p>
                  <p className="font-semibold text-gray-900">{passenger.age} years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Country</p>
                  <p className="font-semibold text-gray-900">{passenger.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Seat & Fare</p>
                  <p className="font-bold text-violet-600">₹{fareData.farePerSeat || 2500}</p>
                  <p className="text-sm text-gray-600">Seat {selectedSeats[index]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fare Breakdown */}
      <div className="bg-white border-2 border-violet-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-violet-100">Fare Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium text-gray-700">Base Fare × {passengers.length}</p>
              <p className="text-sm text-gray-500">₹{fareData.farePerSeat || 2500} per passenger</p>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ₹{(fareData.baseFare || passengers.length * 2500).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-violet-100">
            <p className="font-medium text-gray-700">Taxes & Service Charges (5%)</p>
            <p className="text-lg font-bold text-gray-900">
              ₹{(fareData.taxes || Math.round(passengers.length * 2500 * 0.05)).toLocaleString()}
            </p>
          </div>

          <div className="bg-violet-50 rounded-xl p-4 border-l-4 border-violet-500 mt-6">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-gray-900">Total Amount</p>
              <p className="text-3xl font-bold text-violet-600">₹{totalFare.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/passengers")}
          className="flex-1 bg-white border-2 border-violet-600 text-violet-600 hover:bg-violet-50 font-semibold py-4 rounded-xl transition-all duration-200"
        >
          ← Modify Details
        </button>
        <button
          onClick={handleProceedToPayment}
          className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  );
}
