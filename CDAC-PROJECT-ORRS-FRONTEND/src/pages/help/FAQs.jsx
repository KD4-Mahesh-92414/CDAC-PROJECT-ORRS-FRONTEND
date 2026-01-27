import { useState } from "react";
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  TicketIcon,
  UserIcon,
  CogIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState("booking");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqData = {
    booking: [
      {
        q: "How do I search for trains?",
        a: "Enter your departure and destination stations, select travel date, and click 'Search'. You'll see all available trains with timings and seat availability.",
      },
      {
        q: "Can I book tickets without creating an account?",
        a: "No, you need to create an account and login to book tickets. This helps us save your booking history and passenger details for future bookings.",
      },
      {
        q: "How many passengers can I book for in one transaction?",
        a: "You can book for up to 6 passengers in a single transaction. All passenger details need to be filled during booking.",
      },
      {
        q: "What information do I need to provide for each passenger?",
        a: "You need to provide full name, age, gender, and a valid ID proof number (Aadhar, PAN, Passport, etc.) for each passenger.",
      },
      {
        q: "Can I select specific seats?",
        a: "Yes, after selecting a train, you can choose your preferred seats from the available seat map for that coach and class.",
      },
    ],
    account: [
      {
        q: "How do I create an account?",
        a: "Click 'Login' button, then 'Register here'. Fill in your full name, email, mobile number, and create a secure password. Verify your email to activate your account.",
      },
      {
        q: "How do I update my profile information?",
        a: "After logging in, go to 'My Account' → 'Edit Profile'. You can update your name, mobile number, address, and other details.",
      },
      {
        q: "How do I change my password?",
        a: "Go to 'My Account' → 'Change Password'. Enter your current password, then your new password twice to confirm the change.",
      },
      {
        q: "Can I save passenger details for future bookings?",
        a: "Yes, you can save frequently used passenger details in 'My Account' → 'Saved Passengers' for faster future bookings.",
      },
      {
        q: "How do I view my booking history?",
        a: "Go to 'My Account' → 'Booking History' to see all your past and current bookings with their status and details.",
      },
    ],
    system: [
      {
        q: "What features are available in this railway reservation system?",
        a: "You can search trains, book tickets, select seats, manage your profile, view booking history, check PNR status, and see cancelled trains information.",
      },
      {
        q: "Is this a real railway booking system?",
        a: "This is a demonstration system built for educational purposes. It showcases railway booking functionality but doesn't process real bookings or payments.",
      },
      {
        q: "What train classes are available for booking?",
        a: "The system supports various classes including Sleeper, AC 3-Tier, AC 2-Tier, AC First Class, and Chair Car, depending on the train type.",
      },
      {
        q: "Can I check train schedules and availability?",
        a: "Yes, you can search for trains between any two stations and see their schedules, travel time, and seat availability in real-time.",
      },
      {
        q: "Does the system support mobile devices?",
        a: "Yes, the system is fully responsive and works seamlessly on desktop, tablet, and mobile devices with an optimized user interface.",
      },
    ],
    technical: [
      {
        q: "What browsers are supported?",
        a: "The system works on all modern browsers including Chrome, Firefox, Safari, and Edge. Make sure JavaScript is enabled for full functionality.",
      },
      {
        q: "Why am I getting login errors?",
        a: "Ensure you're using the correct email and password. Check if Caps Lock is on. If you forgot your password, use the 'Forgot Password' option.",
      },
      {
        q: "The page is loading slowly. What should I do?",
        a: "Check your internet connection. Clear your browser cache and cookies. Try refreshing the page or using a different browser.",
      },
      {
        q: "Can I use this system offline?",
        a: "No, this is a web-based system that requires an active internet connection to search trains, make bookings, and access your account.",
      },
      {
        q: "Is my personal information secure?",
        a: "Yes, all data transmission is encrypted using HTTPS. Your personal information and passwords are securely stored and protected.",
      },
    ],
  };

  const categories = [
    { id: "booking", label: "Booking & Tickets", icon: TicketIcon },
    { id: "account", label: "Account Management", icon: UserIcon },
    { id: "system", label: "System Features", icon: CogIcon },
    { id: "technical", label: "Technical Support", icon: WrenchScrewdriverIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QuestionMarkCircleIcon className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our railway reservation system
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-xl font-semibold text-center transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-300 transform scale-105"
                    : "bg-white text-gray-900 border-2 border-violet-200 hover:border-violet-400 hover:shadow-md"
                }`}
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="text-sm">{cat.label}</div>
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData[activeCategory].map((item, idx) => {
            const isExpanded = expandedItems[`${activeCategory}-${idx}`];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden hover:shadow-xl hover:shadow-violet-300 transition-all duration-300"
              >
                <button
                  onClick={() => toggleExpanded(activeCategory, idx)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-violet-50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-violet-100">
                        <span className="text-violet-600 font-bold text-sm">Q</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-left">{item.q}</h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {isExpanded ? (
                      <ChevronUpIcon className="w-5 h-5 text-violet-600" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-violet-600" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="flex items-start gap-4 ml-12">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                          <span className="text-green-600 font-bold text-sm">A</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
