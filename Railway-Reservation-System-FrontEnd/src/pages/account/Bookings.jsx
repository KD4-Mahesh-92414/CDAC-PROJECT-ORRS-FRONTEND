import { useState } from "react";

export default function Bookings() {
  const [bookings] = useState([
    {
      id: 1,
      pnr: "1234567890",
      train: "Rajdhani Express",
      from: "New Delhi",
      to: "Mumbai Central",
      date: "2024-12-25",
      status: "CONFIRMED",
      passengers: 2,
      fare: "₹4,500",
    },
    {
      id: 2,
      pnr: "9876543210",
      train: "Shatabdi Express",
      from: "Mumbai Central",
      to: "Pune Junction",
      date: "2024-11-15",
      status: "COMPLETED",
      passengers: 1,
      fare: "₹2,100",
    },
    {
      id: 3,
      pnr: "5555555555",
      train: "Deccan Express",
      from: "Bangalore",
      to: "Chennai Central",
      date: "2024-10-20",
      status: "CANCELLED",
      passengers: 2,
      fare: "₹2,800",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking History
          </h1>
          <p className="text-lg text-gray-600">
            View all your railway bookings
          </p>
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: "12", color: "violet" },
            { label: "Confirmed", value: "8", color: "green" },
            { label: "Completed", value: "3", color: "blue" },
            { label: "Cancelled", value: "1", color: "red" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-${stat.color}-50 rounded-xl p-4 border-l-4 border-${stat.color}-500`}
            >
              <p className={`text-sm text-${stat.color}-600 mb-1`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold text-${stat.color}-700`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  {/* Journey Info */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">PNR</p>
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      {booking.pnr}
                    </p>
                    <p className="text-sm text-gray-600">{booking.train}</p>
                  </div>

                  {/* Route */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Route</p>
                    <p className="text-gray-900">
                      <span className="font-semibold">{booking.from}</span>
                      <span className="text-violet-600 mx-2">→</span>
                      <span className="font-semibold">{booking.to}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {booking.passengers} passenger(s)
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Journey Date</p>
                    <p className="text-lg font-bold text-gray-900">
                      {booking.date}
                    </p>
                  </div>

                  {/* Status & Fare */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Status</p>
                    <span
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                      View Details
                    </button>
                    {booking.status === "CONFIRMED" && (
                      <button className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Fare */}
                <div className="mt-4 pt-4 border-t border-violet-100">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Total Fare</p>
                    <p className="text-2xl font-bold text-violet-600">
                      {booking.fare}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-12 text-center">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-600 mb-6">
              Start your journey by booking your first train ticket
            </p>
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3 rounded-xl">
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
