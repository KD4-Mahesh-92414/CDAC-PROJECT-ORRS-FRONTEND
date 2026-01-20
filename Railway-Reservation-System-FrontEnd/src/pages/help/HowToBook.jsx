export default function HowToBook() {
  const steps = [
    {
      number: 1,
      title: "Enter Journey Details",
      description:
        "Select your source and destination stations, journey date, and passenger count",
      icon: "🚉",
    },
    {
      number: 2,
      title: "Search & Select Train",
      description:
        "Browse available trains, compare prices, and select the train that suits your needs",
      icon: "🚆",
    },
    {
      number: 3,
      title: "Select Seats",
      description: "Choose your preferred seats from the seat availability map",
      icon: "💺",
    },
    {
      number: 4,
      title: "Fill Passenger Details",
      description:
        "Enter details of all passengers including name, age, and identification information",
      icon: "👤",
    },
    {
      number: 5,
      title: "Review & Confirm",
      description: "Verify all booking details and confirm your reservation",
      icon: "✓",
    },
    {
      number: 6,
      title: "Make Payment",
      description: "Complete payment through your preferred payment method",
      icon: "💳",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Book Tickets
          </h1>
          <p className="text-lg text-gray-600">
            Step-by-step guide to book your railway tickets
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6 hover:shadow-xl hover:shadow-violet-300 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{step.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Booking Tips & Tricks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Book Early",
                description:
                  "Book your tickets 30-60 days in advance for better seat selection and prices",
              },
              {
                title: "Use Tatkal",
                description:
                  "Tatkal booking opens 1 day before departure for last-minute travelers",
              },
              {
                title: "Save Passengers",
                description:
                  "Save frequently used passenger details for faster bookings",
              },
              {
                title: "Check Discounts",
                description:
                  "Look for seasonal discounts and promotional offers while booking",
              },
              {
                title: "Select Wisely",
                description:
                  "Consider travel time, stops, and comfort level before selecting a train class",
              },
              {
                title: "Keep Documents",
                description:
                  "Always carry valid ID proof and printed ticket for smooth journey",
              },
            ].map((tip, idx) => (
              <div key={idx} className="border-l-4 border-violet-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Accepted Payment Methods
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: "Credit Card", icon: "💳" },
              { name: "Debit Card", icon: "🏦" },
              { name: "Net Banking", icon: "🌐" },
              { name: "UPI", icon: "📱" },
              { name: "Wallet", icon: "👛" },
            ].map((method, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors"
              >
                <div className="text-3xl mb-2">{method.icon}</div>
                <p className="text-xs text-gray-600 text-center font-semibold">
                  {method.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Guide */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Video Tutorial
          </h2>
          <div className="bg-violet-100 rounded-xl aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-gray-600">Video tutorial coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
