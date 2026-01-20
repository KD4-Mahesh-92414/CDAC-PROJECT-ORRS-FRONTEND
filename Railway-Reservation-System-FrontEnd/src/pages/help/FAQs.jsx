import { useState } from "react";

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState("booking");

  const faqData = {
    booking: [
      {
        q: "How far in advance can I book tickets?",
        a: "You can book tickets up to 90 days in advance. Tatkal booking opens 1 day before departure.",
      },
      {
        q: "What if seats are not available?",
        a: "You can book with a waitlist. Tickets are confirmed as and when seats become available.",
      },
      {
        q: "Can I book for more than one person at once?",
        a: "Yes, you can book for up to 6 passengers in a single transaction.",
      },
    ],
    payment: [
      {
        q: "What payment methods are accepted?",
        a: "We accept Credit Cards, Debit Cards, Net Banking, UPI, and Digital Wallets.",
      },
      {
        q: "Is online payment secure?",
        a: "Yes, all payments are encrypted with SSL security and PCI-DSS compliant.",
      },
      {
        q: "Will I get a receipt?",
        a: "Yes, a receipt will be sent to your registered email after successful payment.",
      },
    ],
    travel: [
      {
        q: "What documents do I need to carry?",
        a: "Carry a valid ID proof (Aadhar, Passport, Voter ID, PAN) and your booking confirmation.",
      },
      {
        q: "Can I change my seat after booking?",
        a: "Yes, you can change your seat until 24 hours before departure for regular bookings.",
      },
      {
        q: "What happens if I miss my train?",
        a: "You can rebook on the next available train of your choice by paying the fare difference.",
      },
    ],
    account: [
      {
        q: "How do I create an account?",
        a: "Click on 'Register' and fill in your basic details like name, email, and mobile number.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page and follow the instructions sent to your email.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact our support team with your request. Your account will be deleted within 7 days.",
      },
    ],
  };

  const categories = [
    { id: "booking", label: "Booking" },
    { id: "payment", label: "Payment" },
    { id: "travel", label: "Travel" },
    { id: "account", label: "Account" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-300"
                  : "bg-white text-gray-900 border-2 border-violet-200 hover:border-violet-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData[activeCategory].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden hover:shadow-xl hover:shadow-violet-300 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-violet-100">
                      <span className="text-violet-600 font-bold">Q</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-3">{item.q}</h3>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                          <span className="text-green-600 font-bold">A</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Couldn't Find Answer */}
        <div className="mt-12 bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl shadow-lg shadow-violet-300 p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">
            Couldn't Find Your Answer?
          </h3>
          <p className="mb-6 opacity-90">
            Our support team is here to help. Contact us anytime for assistance.
          </p>
          <button className="bg-white text-violet-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
