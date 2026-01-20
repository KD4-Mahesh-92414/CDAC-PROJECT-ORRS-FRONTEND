export default function CancellationRefund() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cancellation & Refund Policy
          </h1>
          <p className="text-lg text-gray-600">
            Understand our comprehensive cancellation and refund policies
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-red-900 mb-2">Important</h3>
          <p className="text-sm text-red-800">
            Cancellation charges increase as the journey date approaches. Please
            cancel your booking well in advance to get maximum refund.
          </p>
        </div>

        {/* Cancellation Charges Table */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cancellation Charges
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-600 to-violet-700 text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Days before Departure
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Cancellation Charge
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Refund %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      days: "More than 30 days",
                      charge: "₹100",
                      refund: "100%",
                    },
                    {
                      days: "15-30 days",
                      charge: "10% of fare",
                      refund: "90%",
                    },
                    { days: "7-14 days", charge: "25% of fare", refund: "75%" },
                    { days: "2-6 days", charge: "50% of fare", refund: "50%" },
                    {
                      days: "Less than 48 hours",
                      charge: "100% of fare",
                      refund: "0%",
                    },
                  ].map((item, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-violet-100 hover:bg-violet-50 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-violet-50/30"
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {item.days}
                      </td>
                      <td className="px-6 py-4 text-gray-900">{item.charge}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-semibold">
                          {item.refund}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Refund Timeline */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Refund Processing Timeline
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Cancellation Request",
                description:
                  "You submit cancellation request through our website or app",
              },
              {
                step: "2",
                title: "Confirmation",
                description:
                  "We verify your booking and calculate refund amount",
              },
              {
                step: "3",
                title: "Processing (5-7 days)",
                description:
                  "Refund is processed to your original payment method",
              },
              {
                step: "4",
                title: "Credit",
                description:
                  "Amount appears in your account (may take additional 2-3 days)",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 border-l-2 border-violet-200 pl-6 pb-6 last:border-0">
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Cases */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Special Cases
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Train Cancellation",
                description:
                  "If the train is cancelled by us, you get 100% refund regardless of cancellation timing.",
              },
              {
                title: "Medical Emergency",
                description:
                  "For genuine medical emergencies, we may waive cancellation charges upon submission of valid medical documents.",
              },
              {
                title: "Rebooking",
                description:
                  "You can rebook on any other train of your choice without paying additional charges instead of refund.",
              },
              {
                title: "Group Booking",
                description:
                  "Group bookings have different cancellation policies. Please contact our support team for details.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border-2 border-violet-200 rounded-xl p-4 hover:border-violet-400 transition-colors"
              >
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Refundable Items */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-amber-900 mb-3">
            Non-Refundable Items
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-amber-800 flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Booking convenience fee / Portal charges</span>
            </li>
            <li className="text-sm text-amber-800 flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Insurance charges (if opted separately)</span>
            </li>
            <li className="text-sm text-amber-800 flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>GST on booking charges</span>
            </li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How do I cancel my booking?",
                a: "Log into your account, go to Booking History, select the booking, and click Cancel. Follow the on-screen instructions.",
              },
              {
                q: "Can I cancel a confirmed booking?",
                a: "Yes, you can cancel confirmed bookings until 2 hours before departure.",
              },
              {
                q: "What if I cancel from the station?",
                a: "You can cancel from the station, but you will be charged an additional ₹100 for on-site cancellation.",
              },
              {
                q: "How do I check my refund status?",
                a: "Check your booking history or contact our support team with your PNR number.",
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
