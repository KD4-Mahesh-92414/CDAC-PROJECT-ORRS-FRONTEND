import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function PNRStatus() {
  const navigate = useNavigate();
  const [pnr, setPnr] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheckStatus = () => {
    if (pnr.length === 10) {
      // Mock data
      setStatus({
        pnr: pnr,
        trainNumber: "12025",
        trainName: "Rajdhani Express",
        from: "New Delhi",
        to: "Mumbai Central",
        bookingDate: "2024-12-15",
        journeyDate: "2024-12-25",
        status: "CONFIRMED",
        passengers: [
          { name: "Rajesh Kumar", age: 35, coach: "A", seat: "12" },
          { name: "Priya Kumar", age: 32, coach: "A", seat: "13" },
        ],
        totalFare: "₹4,500",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Check PNR Status
          </h1>
          <p className="text-lg text-gray-600">
            Get instant updates on your booking status
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Enter PNR Number *
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value.toUpperCase())}
                  maxLength="10"
                  className="flex-1 px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none transition-colors text-center text-lg font-bold tracking-wider"
                  placeholder="10 digits"
                />
                <button
                  onClick={handleCheckStatus}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-300"
                >
                  Check
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PNR is a 10-digit unique reference number provided after booking
              </p>
            </div>
          </div>
        </div>

        {/* Status Result */}
        {status && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Status Header */}
            <div
              className={`rounded-2xl shadow-lg p-6 text-white ${
                status.status === "CONFIRMED"
                  ? "bg-green-600 shadow-green-300"
                  : status.status === "WAITING"
                  ? "bg-amber-600 shadow-amber-300"
                  : "bg-red-600 shadow-red-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Booking Status</p>
                  <h2 className="text-3xl font-bold">{status.status}</h2>
                </div>
                <div className="text-5xl">
                  {status.status === "CONFIRMED"
                    ? "✓"
                    : status.status === "WAITING"
                    ? "⏳"
                    : "✕"}
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Journey Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-b-2 border-violet-100 pb-4">
                  <p className="text-sm text-gray-500 mb-1">Train Number</p>
                  <p className="text-lg font-bold text-gray-900">
                    {status.trainNumber}
                  </p>
                </div>
                <div className="border-b-2 border-violet-100 pb-4">
                  <p className="text-sm text-gray-500 mb-1">Train Name</p>
                  <p className="text-lg font-bold text-gray-900">
                    {status.trainName}
                  </p>
                </div>
                <div className="border-b-2 border-violet-100 pb-4">
                  <p className="text-sm text-gray-500 mb-1">From Station</p>
                  <p className="text-lg font-bold text-gray-900">
                    {status.from}
                  </p>
                </div>
                <div className="border-b-2 border-violet-100 pb-4">
                  <p className="text-sm text-gray-500 mb-1">To Station</p>
                  <p className="text-lg font-bold text-gray-900">{status.to}</p>
                </div>
                <div className="border-b-2 border-violet-100 pb-4">
                  <p className="text-sm text-gray-500 mb-1">Booking Date</p>
                  <p className="text-lg font-bold text-gray-900">
                    {status.bookingDate}
                  </p>
                </div>
                <div className="border-b-2 border-violet-100 pb-4">
                  <p className="text-sm text-gray-500 mb-1">Journey Date</p>
                  <p className="text-lg font-bold text-gray-900">
                    {status.journeyDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Passenger Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-violet-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        Age
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        Coach
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        Seat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {status.passengers.map((passenger, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-violet-100 hover:bg-violet-50"
                      >
                        <td className="py-3 px-4 text-gray-900">
                          {passenger.name}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {passenger.age}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {passenger.coach}
                        </td>
                        <td className="py-3 px-4 font-bold text-violet-600">
                          {passenger.seat}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fare Summary */}
            <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
              <div className="flex justify-between items-center">
                <p className="text-lg text-gray-600">Total Fare:</p>
                <p className="text-4xl font-bold text-violet-600">
                  {status.totalFare}
                </p>
              </div>
            </div>
          </div>
        )}

        {!status && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-12 h-12 text-violet-600" />
            </div>
            <p className="text-gray-600 text-lg">
              Enter your PNR number above to check your booking status
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
