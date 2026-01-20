export default function TatkalRules() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tatkal Booking Rules
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about Tatkal ticket bookings
          </p>
        </div>

        {/* What is Tatkal */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is Tatkal Booking?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Tatkal booking is a last-minute reservation facility that opens just
            1 day before the train departure. This service is perfect for urgent
            or unplanned journeys. Tatkal tickets are issued at a premium fare
            and are allotted on a first-come-first-served basis. The word
            "Tatkal" means "urgent" or "immediate" in Hindi.
          </p>
        </div>

        {/* Tatkal Timings */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tatkal Booking Timings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                type: "Morning Trains (4 AM - 10 AM)",
                time: "2:00 AM - 4:00 AM",
                day: "Same day (1 day before departure)",
              },
              {
                type: "Afternoon Trains (10 AM - 4 PM)",
                time: "11:00 AM - 1:00 PM",
                day: "Same day (1 day before departure)",
              },
              {
                type: "Evening Trains (4 PM - 10 PM)",
                time: "5:00 PM - 7:00 PM",
                day: "Same day (1 day before departure)",
              },
              {
                type: "Night Trains (10 PM - 4 AM)",
                time: "9:00 PM - 11:00 PM",
                day: "Same day (1 day before departure)",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border-2 border-violet-200 rounded-xl p-4 hover:bg-violet-50 transition-colors"
              >
                <h4 className="font-bold text-gray-900 mb-3">{item.type}</h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Booking Time:</span>
                    <span className="block text-violet-600 font-bold">
                      {item.time}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Available:</span>
                    <span className="block text-violet-600 font-bold">
                      {item.day}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Eligibility Criteria
          </h2>
          <div className="space-y-3">
            {[
              "Must be an Indian citizen or an Indian resident",
              "Valid ID proof is required at the time of booking and travel",
              "Maximum 4 passengers can book in a single Tatkal transaction",
              "Tatkal is available for most express and passenger trains",
              "Minimum age for tatkal booking is 5 years",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 border-l-4 border-violet-600 bg-violet-50 rounded-r-lg"
              >
                <span className="text-violet-600 font-bold text-lg mt-0">
                  ✓
                </span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tatkal Fares */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tatkal Premium Fares
          </h2>
          <p className="text-gray-600 mb-6">
            Tatkal fares are higher than regular booking fares. The premium
            varies based on the distance and train class:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-violet-600 to-violet-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">
                    Train Class
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Distance
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    class: "AC First Class",
                    distance: "All distances",
                    premium: "500 + 50% of fare",
                  },
                  {
                    class: "AC 2-Tier",
                    distance: "All distances",
                    premium: "250 + 50% of fare",
                  },
                  {
                    class: "AC 3-Tier",
                    distance: "All distances",
                    premium: "250 + 40% of fare",
                  },
                  {
                    class: "Sleeper",
                    distance: "All distances",
                    premium: "200 + 30% of fare",
                  },
                  {
                    class: "General (Unreserved)",
                    distance: "All distances",
                    premium: "100 + 20% of fare",
                  },
                ].map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-violet-100 hover:bg-violet-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-violet-50/30"
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {item.class}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{item.distance}</td>
                    <td className="px-6 py-4 text-violet-600 font-bold">
                      {item.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Rules */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-red-900 mb-4">
            Important Tatkal Rules
          </h3>
          <ul className="space-y-3">
            {[
              "Tatkal tickets cannot be cancelled or refunded",
              "No waitlist option is provided for Tatkal bookings",
              "Seats are allotted on a first-come-first-served basis",
              "Tatkal tickets are non-transferable and cannot be changed to another person",
              "No refund is provided even if the train is cancelled",
              "Maximum 4 passengers per Tatkal transaction",
              "At least one confirmed/RAC ticket from regular booking for the same journey",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-0.5">!</span>
                <p className="text-red-800 text-sm">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* How to Book Tatkal */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Steps to Book Tatkal
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Login/Register",
                description:
                  "Create an account or login to your existing account",
              },
              {
                step: "2",
                title: "Select Route",
                description: "Choose your source and destination stations",
              },
              {
                step: "3",
                title: "Select Train",
                description: "Pick your preferred train from available options",
              },
              {
                step: "4",
                title: "Select Seats",
                description: "Choose available seats from the seat map",
              },
              {
                step: "5",
                title: "Enter Details",
                description: "Fill in passenger and contact information",
              },
              {
                step: "6",
                title: "Payment",
                description: "Complete the payment process securely",
              },
              {
                step: "7",
                title: "Confirmation",
                description: "Receive your PNR and booking confirmation",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can Tatkal tickets be refunded?",
                a: "No, Tatkal tickets are non-refundable under any circumstances.",
              },
              {
                q: "What is the difference between Tatkal and regular booking?",
                a: "Tatkal opens 1 day before departure and charges premium fares, while regular booking is available 90 days in advance at lower fares.",
              },
              {
                q: "Can I book multiple Tatkal tickets?",
                a: "You can make multiple bookings, but each transaction is limited to 4 passengers.",
              },
              {
                q: "What happens if the train is cancelled?",
                a: "No refund is provided even if the train is cancelled. You can get a credit note for future use.",
              },
              {
                q: "Can I change my seat in Tatkal booking?",
                a: "No, seats cannot be changed or modified after confirmation.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-violet-600 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">Q: {item.q}</h4>
                <p className="text-sm text-gray-600">A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
