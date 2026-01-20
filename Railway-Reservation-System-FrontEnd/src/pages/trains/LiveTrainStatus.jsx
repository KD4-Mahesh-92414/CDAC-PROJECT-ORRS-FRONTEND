export default function LiveTrainStatus() {
  const mockTrains = [
    {
      id: 1,
      number: "12025",
      name: "Rajdhani Express",
      from: "New Delhi",
      to: "Mumbai Central",
      currentStation: "Guna Junction",
      scheduledTime: "14:30",
      actualTime: "14:45",
      status: "Running Late (15 min)",
      delay: true,
    },
    {
      id: 2,
      number: "12345",
      name: "Shatabdi Express",
      from: "Mumbai Central",
      to: "Pune Junction",
      currentStation: "Lonavala",
      scheduledTime: "16:00",
      actualTime: "15:55",
      status: "On Time",
      delay: false,
    },
    {
      id: 3,
      number: "12987",
      name: "Deccan Express",
      from: "Bangalore",
      to: "Chennai Central",
      currentStation: "Vellore City",
      scheduledTime: "18:30",
      actualTime: "18:20",
      status: "Running Ahead (10 min)",
      delay: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live Train Status
          </h1>
          <p className="text-lg text-gray-600">
            Real-time tracking of all running trains
          </p>
        </div>

        {/* Trains List */}
        <div className="space-y-6">
          {mockTrains.map((train) => (
            <div
              key={train.id}
              className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden hover:shadow-xl hover:shadow-violet-300 transition-all duration-300"
            >
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  {/* Train Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="bg-violet-600 text-white rounded-xl p-4 min-w-fit">
                        <p className="text-xs font-semibold">TRAIN NO.</p>
                        <p className="text-2xl font-bold">{train.number}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {train.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {train.from} → {train.to}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Journey Status */}
                  <div className="lg:col-span-2 border-l-2 border-r-2 border-violet-100 px-6">
                    <p className="text-sm text-gray-500 mb-2">Current Status</p>
                    <p className="text-lg font-bold text-gray-900 mb-3">
                      {train.currentStation}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block h-3 w-3 rounded-full ${
                          train.delay
                            ? "bg-red-500 animate-pulse"
                            : "bg-green-500"
                        }`}
                      ></span>
                      <span
                        className={`text-sm font-semibold ${
                          train.delay ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {train.status}
                      </span>
                    </div>
                  </div>

                  {/* Time Details */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-2">
                      Scheduled / Actual
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        {train.scheduledTime}
                      </span>{" "}
                      /{" "}
                      <span
                        className={`font-semibold ${
                          train.delay ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {train.actualTime}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-6 border-t border-violet-100">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-500 font-semibold">
                      Journey Progress
                    </p>
                    <p className="text-xs text-gray-500">65% Complete</p>
                  </div>
                  <div className="w-full bg-violet-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-violet-500 to-violet-600 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Update Frequency Info */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">
                Live Status Updates
              </h4>
              <p className="text-sm text-gray-600">
                Station-wise status information is updated every 5 minutes. For
                real-time tracking of your specific train, use the PNR Status
                feature with your booking details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
