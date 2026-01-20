export default function TravelGuidelines() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Guidelines
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need for a safe and comfortable journey
          </p>
        </div>

        {/* Before You Travel */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Before You Travel
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: "🆔",
                title: "Carry Valid ID Proof",
                details:
                  "Always carry a valid identity document like Aadhar, Passport, Voter ID, or PAN card",
              },
              {
                icon: "🎫",
                title: "Keep Your Ticket Ready",
                details:
                  "Have your booking confirmation or printed ticket ready for ticket verification at the station",
              },
              {
                icon: "⏰",
                title: "Arrive Early",
                details:
                  "Reach the station at least 30 minutes before the scheduled departure time",
              },
              {
                icon: "🧳",
                title: "Check Baggage Allowance",
                details:
                  "Verify baggage limits as per your ticket class. Additional luggage may incur extra charges",
              },
              {
                icon: "📱",
                title: "Save Important Numbers",
                details:
                  "Keep our customer support number and your coach details handy during the journey",
              },
              {
                icon: "💳",
                title: "Have Alternative Payment",
                details:
                  "Carry cash and cards for meal purchases and platform services",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-violet-600 pl-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Secure Your Luggage",
                tips: [
                  "Use luggage locks",
                  "Keep valuable items with you",
                  "Avoid keeping cash in open pockets",
                ],
              },
              {
                title: "Personal Safety",
                tips: [
                  "Stay alert at stations",
                  "Avoid traveling late at night alone",
                  "Keep emergency contacts",
                ],
              },
              {
                title: "During Journey",
                tips: [
                  "Use provided berth locks",
                  "Don't accept food from strangers",
                  "Stay in designated areas",
                ],
              },
              {
                title: "Health & Hygiene",
                tips: [
                  "Use hand sanitizers",
                  "Don't share personal items",
                  "Maintain social distance",
                ],
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-violet-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3">{item.title}</h4>
                <ul className="space-y-2">
                  {item.tips.map((tip, tidx) => (
                    <li
                      key={tidx}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-violet-600 font-bold">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* What's Allowed & Not Allowed */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What's Allowed & What's Not
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                <span>✓</span> Allowed Items
              </h3>
              <ul className="space-y-2">
                {[
                  "Personal clothing and toiletries",
                  "Books, documents, and electronics",
                  "Food and beverages",
                  "Medications with prescription",
                  "Small pets (with permission)",
                  "Baby carriages and wheelchairs",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                <span>✕</span> Prohibited Items
              </h3>
              <ul className="space-y-2">
                {[
                  "Firearms and weapons",
                  "Explosives and fireworks",
                  "Sharp objects and tools",
                  "Prohibited drugs and alcohol",
                  "Hazardous chemicals",
                  "Large machinery and tools",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-red-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Facilities Available */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Facilities Available On Board
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🚽", name: "Restrooms" },
              { icon: "🍽️", name: "Dining Car" },
              { icon: "🧼", name: "Washing Facilities" },
              { icon: "🧥", name: "Blankets & Pillows" },
              { icon: "📞", name: "Communication" },
              { icon: "💊", name: "First Aid" },
              { icon: "🔌", name: "Power Outlets" },
              { icon: "📺", name: "Entertainment" },
              { icon: "🎫", name: "Information Counter" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-xs text-gray-700 text-center font-semibold">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-red-900 mb-4">
            Emergency Contacts During Journey
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "RPF (Railway Protection Force)", number: "139" },
              { title: "Medical Emergency", number: "Ask TC/Guard" },
              { title: "Customer Support", number: "+91-XXXX-XXXX-XXX" },
              { title: "Complaint Registration", number: "1800-111-139" },
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-sm text-red-700 font-semibold">
                  {item.title}
                </p>
                <p className="text-lg text-red-900 font-bold">{item.number}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Post-Travel */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            After Your Journey
          </h2>
          <div className="space-y-4">
            {[
              "Check for any lost items on your seat or berth",
              "Report any damage or issues to the on-duty staff",
              "Keep your luggage with you while exiting the train",
              "Report lost luggage to the Lost & Found counter",
              "Provide feedback about your journey experience",
              "File complaint if needed through our customer support",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-3 bg-violet-50 rounded-lg"
              >
                <span className="text-violet-600 font-bold">{idx + 1}.</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
