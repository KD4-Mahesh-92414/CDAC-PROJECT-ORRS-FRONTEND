export default function EmergencyHelpline() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Emergency Helpline
          </h1>
          <p className="text-lg text-red-700">
            24/7 Emergency support for critical situations during your journey
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-100 border-l-4 border-red-600 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🚨</div>
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">
                Emergency? Call Immediately
              </h2>
              <p className="text-red-800 mb-4">
                If you are in immediate danger or facing a critical medical
                emergency, contact the emergency services using the numbers
                provided below.
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg">
                  📞 139 (RPF)
                </div>
                <div className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg">
                  🏥 112 (Ambulance)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: "RPF (Railway Protection Force)",
              phone: "139",
              description:
                "For security threats, thefts, or any criminal activity on trains",
              available: "24/7",
              icon: "🚔",
            },
            {
              title: "Medical Emergency",
              phone: "Ask TC/Guard",
              description:
                "First aid, medical assistance, or health emergency assistance on board",
              available: "24/7 On Train",
              icon: "🏥",
            },
            {
              title: "Railway Accident",
              phone: "Dial 112 + 139",
              description: "In case of train accident or major incident",
              available: "Immediate Response",
              icon: "🚆",
            },
            {
              title: "Lost & Found",
              phone: "1800-111-139",
              description: "Report lost luggage, documents, or valuables",
              available: "24/7",
              icon: "🔍",
            },
            {
              title: "Police Complaint",
              phone: "100",
              description:
                "For sexual harassment, theft, or any criminal offense",
              available: "24/7",
              icon: "👮",
            },
            {
              title: "Women Safety",
              phone: "1091 or 139",
              description:
                "Dedicated support for women travelers facing safety issues",
              available: "24/7",
              icon: "👩",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg shadow-red-200 border-l-4 border-red-600 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-red-600">
                      {service.phone}
                    </p>
                    <p className="text-xs text-gray-500">{service.available}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Procedures */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What to Do in Emergencies
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Medical Emergency",
                steps: [
                  "Inform the Train Conductor (TC) or any staff member immediately",
                  "Call 139 or ask for first aid assistance on board",
                  "Provide details of the condition to medical personnel",
                  "Keep important documents and insurance information ready",
                ],
              },
              {
                title: "Security Issue / Theft",
                steps: [
                  "Move to a safe location or approach other passengers",
                  "Alert the Train Conductor or Ticket Collector immediately",
                  "Call 139 (RPF) to report the incident",
                  "Note down details of the perpetrator if safe to do so",
                  "File an FIR at the next station or your destination",
                ],
              },
              {
                title: "Accident / Derailment",
                steps: [
                  "Stay calm and remain seated if safe",
                  "Move away from the train tracks",
                  "Call 112 for emergency services immediately",
                  "Help other injured passengers if possible",
                  "Wait for official help to arrive",
                ],
              },
              {
                title: "Fire or Smoke",
                steps: [
                  "Use the emergency chain to stop the train if necessary",
                  "Evacuate through nearest door or window",
                  "Move to a safe distance from the train",
                  "Call 139 and inform about the emergency",
                  "Check if other passengers need assistance",
                ],
              },
            ].map((procedure, idx) => (
              <div key={idx} className="border-l-4 border-red-600 pl-6 py-4">
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {procedure.title}
                </h4>
                <ol className="space-y-2">
                  {procedure.steps.map((step, sidx) => (
                    <li key={sidx} className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-0.5">
                        {sidx + 1}.
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Important Contacts */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Important Contact Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                service: "RPF Emergency",
                number: "139",
                type: "Crime/Security",
              },
              { service: "Ambulance", number: "112", type: "Medical" },
              { service: "Police", number: "100", type: "Crime/Law" },
              {
                service: "Toll Free Support",
                number: "1800-111-139",
                type: "General",
              },
              {
                service: "Women Safety",
                number: "1091",
                type: "Women Travelers",
              },
              {
                service: "Railway Complaint",
                number: "0120-2628-1111",
                type: "Complaints",
              },
            ].map((contact, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200"
              >
                <p className="text-sm text-gray-600 mb-1">{contact.service}</p>
                <p className="text-2xl font-bold text-red-600 mb-1">
                  {contact.number}
                </p>
                <p className="text-xs text-gray-500">{contact.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Safety Tips for Train Travel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Before Boarding",
                tips: [
                  "Check train timings and platform number",
                  "Verify your ticket details",
                  "Travel with minimal valuables",
                  "Inform someone about your journey",
                ],
              },
              {
                title: "During Journey",
                tips: [
                  "Keep cabin locked from inside",
                  "Stay aware of surroundings",
                  "Don't accept food from strangers",
                  "Use official staff only for assistance",
                ],
              },
              {
                title: "Personal Safety",
                tips: [
                  "Keep important documents safe",
                  "Avoid traveling alone late at night",
                  "Use luggage locks",
                  "Trust your instincts",
                ],
              },
              {
                title: "Women Safety",
                tips: [
                  "Book women's compartments if available",
                  "Keep emergency contact ready",
                  "Report any harassment immediately",
                  "Use reserved seats and coaches",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.tips.map((tip, tidx) => (
                    <li
                      key={tidx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
