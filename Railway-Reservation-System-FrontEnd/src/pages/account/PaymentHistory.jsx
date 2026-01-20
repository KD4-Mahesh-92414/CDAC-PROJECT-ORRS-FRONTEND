import { useState } from "react";

export default function PaymentHistory() {
  const [payments] = useState([
    {
      id: 1,
      pnr: "1234567890",
      date: "2024-12-15",
      amount: "₹4,500",
      method: "Credit Card",
      status: "Success",
      trainName: "Rajdhani Express",
    },
    {
      id: 2,
      pnr: "9876543210",
      date: "2024-11-10",
      amount: "₹2,100",
      method: "Debit Card",
      status: "Success",
      trainName: "Shatabdi Express",
    },
    {
      id: 3,
      pnr: "5555555555",
      date: "2024-10-18",
      amount: "₹2,800",
      method: "UPI",
      status: "Refunded",
      trainName: "Deccan Express",
    },
    {
      id: 4,
      pnr: "3333333333",
      date: "2024-09-25",
      amount: "₹5,200",
      method: "Net Banking",
      status: "Success",
      trainName: "Golden Arrow",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Refunded":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment History
          </h1>
          <p className="text-lg text-gray-600">
            Track all your transactions and payment details
          </p>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Spent", value: "₹14,600", icon: "💰" },
            { label: "Total Payments", value: "4", icon: "📊" },
            { label: "Refunded", value: "₹2,800", icon: "🔄" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-violet-600">
                    {stat.value}
                  </p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-violet-600 to-violet-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">
                    PNR / Train
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <tr
                    key={payment.id}
                    className={`border-b border-violet-100 hover:bg-violet-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-violet-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {payment.pnr}
                        </p>
                        <p className="text-sm text-gray-500">
                          {payment.trainName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{payment.date}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-violet-600">
                        {payment.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-violet-600 hover:text-violet-700 font-semibold text-sm">
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Saved Payment Methods
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { type: "Credit Card", last4: "4242", expiryType: "Visa" },
              { type: "Debit Card", last4: "5555", expiryType: "SBI" },
              { type: "UPI", last4: "user@upi", expiryType: "Active" },
            ].map((method, idx) => (
              <div
                key={idx}
                className="border-2 border-violet-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{method.type}</p>
                    <p className="text-sm text-gray-500">
                      {method.expiryType} • ****{method.last4}
                    </p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 font-semibold text-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors">
            Add New Payment Method
          </button>
        </div>

        {/* Download Invoice */}
        <div className="mt-8 bg-violet-50 border-2 border-violet-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">📄</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Download Invoices
          </h3>
          <p className="text-gray-600 mb-4">
            Get your transaction receipts and invoices for tax purposes
          </p>
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3 rounded-xl">
            Download All Invoices
          </button>
        </div>
      </div>
    </div>
  );
}
