import { useState } from "react";

export default function CustomerSupport() {
  const [activeTab, setActiveTab] = useState("faq");
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "booking",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support ticket submitted", ticketForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Support
          </h1>
          <p className="text-lg text-gray-600">
            We're here to help with any questions or issues
          </p>
        </div>

        {/* Support Tabs */}
        <div className="flex gap-4 mb-8 border-b border-violet-200">
          {[
            { id: "faq", label: "FAQs" },
            { id: "ticket", label: "Submit Ticket" },
            { id: "contact", label: "Contact Info" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === tab.id
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQs Tab */}
        {activeTab === "faq" && (
          <div className="space-y-4">
            {[
              {
                q: "How can I track my booking?",
                a: "Use the PNR Status feature on our website or app to track your booking in real-time.",
              },
              {
                q: "What should I do if I missed my train?",
                a: "You can rebook on the next available train by paying the fare difference through our website.",
              },
              {
                q: "How do I get a refund?",
                a: "Visit the Cancellation & Refund Policy page to understand the refund process and timelines.",
              },
              {
                q: "Can I change my ticket details?",
                a: "You can change your seat, co-passenger, or train up to 24 hours before departure.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6"
              >
                <h3 className="font-bold text-gray-900 mb-3">Q: {item.q}</h3>
                <p className="text-gray-600">A: {item.a}</p>
              </div>
            ))}
          </div>
        )}

        {/* Submit Ticket Tab */}
        {activeTab === "ticket" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Submit Support Ticket
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={ticketForm.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={ticketForm.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={ticketForm.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                  >
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Issue</option>
                    <option value="cancellation">Cancellation/Refund</option>
                    <option value="technical">Technical Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={ticketForm.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={ticketForm.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-violet-300"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === "contact" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "📞",
                title: "Phone Support",
                value: "1800-111-139",
                details: "Available 24/7 (Toll Free)",
              },
              {
                icon: "📧",
                title: "Email Support",
                value: "support@railway.com",
                details: "Response within 24 hours",
              },
              {
                icon: "💬",
                title: "Live Chat",
                value: "Chat Now",
                details: "Available 9 AM - 9 PM IST",
              },
            ].map((contact, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6 text-center"
              >
                <div className="text-5xl mb-4">{contact.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {contact.title}
                </h3>
                <p className="text-2xl font-bold text-violet-600 mb-2">
                  {contact.value}
                </p>
                <p className="text-sm text-gray-600">{contact.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
