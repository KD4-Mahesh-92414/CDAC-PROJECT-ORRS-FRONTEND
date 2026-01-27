import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapPinIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export default function CustomerSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Support
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for any assistance or queries
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-2xl font-bold text-violet-600 mb-2">1800-111-139</p>
            <p className="text-sm text-gray-600 mb-4">Toll Free • Available 24/7</p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Currently Available</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-lg font-bold text-violet-600 mb-2">support@railway.gov.in</p>
            <p className="text-sm text-gray-600 mb-4">Response within 24 hours</p>
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <ClockIcon className="w-4 h-4" />
              <span>Business Hours</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-lg font-bold text-violet-600 mb-2">Chat with Agent</p>
            <p className="text-sm text-gray-600 mb-4">9:00 AM - 9:00 PM IST</p>
            <div className="flex items-center justify-center gap-2 text-sm text-orange-600">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Peak Hours</span>
            </div>
          </div>
        </div>

        {/* Quick Help */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl shadow-lg shadow-violet-300 p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <GlobeAltIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
              <h3 className="font-bold mb-2">Check PNR Status</h3>
              <p className="text-sm opacity-90">Track your booking instantly</p>
            </div>
            <div className="text-center">
              <EnvelopeIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
              <h3 className="font-bold mb-2">View FAQs</h3>
              <p className="text-sm opacity-90">Find answers to common questions</p>
            </div>
            <div className="text-center">
              <PhoneIcon className="w-8 h-8 mx-auto mb-2 opacity-90" />
              <h3 className="font-bold mb-2">Emergency Helpline</h3>
              <p className="text-sm opacity-90">For urgent travel assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
