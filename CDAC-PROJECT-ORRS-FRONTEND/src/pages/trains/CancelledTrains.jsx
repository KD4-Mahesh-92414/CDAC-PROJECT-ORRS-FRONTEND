import { useNavigate } from "react-router-dom";

export default function CancelledTrains() {
  const navigate = useNavigate();
  const cancelledTrains = [
    {
      id: 1,
      trainNumber: "12025",
      trainName: "Rajdhani Express",
      from: "New Delhi",
      to: "Mumbai Central",
      date: "2024-12-25",
      reason: "Maintenance Work",
      status: "Cancelled",
    },
    {
      id: 2,
      trainNumber: "12345",
      trainName: "Shatabdi Express",
      from: "Mumbai Central",
      to: "Pune Junction",
      date: "2024-12-26",
      reason: "Track Defect Repair",
      status: "Cancelled",
    },
    {
      id: 3,
      trainNumber: "12987",
      trainName: "Deccan Express",
      from: "Bangalore",
      to: "Chennai Central",
      date: "2024-12-27",
      reason: "Weather Conditions",
      status: "Rescheduled",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cancelled / Rescheduled Trains
          </h1>
          <p className="text-lg text-gray-600">
            View all cancelled trains and refund status
          </p>
        </div>


        {/* Cancelled Trains Table */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-violet-600 to-violet-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">
                    Train Number
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Train Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Route</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Reason</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {cancelledTrains.map((train, idx) => (
                  <tr
                    key={train.id}
                    className={`border-b border-violet-100 hover:bg-violet-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-violet-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">
                        {train.trainNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {train.trainName}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {train.from} → {train.to}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{train.date}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-sm font-medium">
                        {train.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                          train.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {train.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl shadow-lg shadow-violet-300 p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
          <p className="mb-4 opacity-90">
            Contact our customer support team for any queries regarding
            cancellations and refunds
          </p>
          <button 
            onClick={() => navigate('/contact/support')}
            className="bg-white text-violet-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
