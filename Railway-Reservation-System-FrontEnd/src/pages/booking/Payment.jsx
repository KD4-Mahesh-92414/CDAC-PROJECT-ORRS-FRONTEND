import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BookingContext } from "../../contexts/BookingContext";
import toast from "react-hot-toast";

export default function Payment() {
  const navigate = useNavigate();
  const { selectedTrain, passengers, resetBooking, fareData } =
    useContext(BookingContext);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    if (!selectedTrain) {
      navigate("/");
      return;
    }
  }, [selectedTrain, navigate]);

  const totalFare = fareData.totalFare || Math.round(passengers.length * 2500 * 1.05);

  const handlePayment = async () => {
    setProcessing(true);
    toast.loading("Processing payment...", { id: "payment" });
    
    setTimeout(() => {
      const bookingRef = `BR${Date.now().toString().slice(-8).toUpperCase()}`;
      toast.success(`Payment successful! Booking ID: ${bookingRef}`, { id: "payment" });
      resetBooking();
      navigate("/confirmation", { state: { bookingRef, totalFare } });
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Journey Info Card - Using Vineet's structure */}
      <div className="bg-yellow-100 rounded-xl p-6 flex justify-between items-center border shadow-sm">
        {/* Left - Departure */}
        <div>
          <p className="text-xl font-bold text-gray-900">{selectedTrain?.departureTime || "17:45 PM"}</p>
          <p className="italic text-gray-700">{selectedTrain?.departureStation || "Departure Station"}</p>
          <p className="mt-2 text-sm text-gray-600">{selectedTrain?.departureDate || "23 Oct 2025"}</p>
        </div>

        {/* Center - Duration */}
        <div className="text-center">
          <p className="text-sm text-gray-600">{selectedTrain?.duration || "6.25 Hrs"}</p>
          <p className="text-2xl font-bold text-violet-600">→</p>
        </div>

        {/* Right - Arrival */}
        <div>
          <p className="text-xl font-bold text-gray-900">{selectedTrain?.arrivalTime || "12:10 AM"}</p>
          <p className="italic text-gray-700">{selectedTrain?.arrivalStation || "Arrival Station"}</p>
          <p className="mt-2 text-sm text-gray-600">{selectedTrain?.arrivalDate || "24 Oct 2025"}</p>
        </div>

        {/* Train Info */}
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{selectedTrain?.number || "15065"}</p>
          <p className="text-gray-700">{selectedTrain?.name || "Express Train"}</p>
          <p className="font-semibold mt-1 text-violet-600">Payment Gateway</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h2>
            <p className="text-gray-600">Secure payment for your railway booking</p>
          </div>
          
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white border-2 border-violet-100 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-violet-100">
                Select Payment Method
              </h3>

              <div className="space-y-4">
                {[
                  { id: "UPI", name: "UPI Payment", icon: "📱", desc: "Pay using UPI ID" },
                  { id: "CARD", name: "Debit/Credit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
                  { id: "NETBANKING", name: "Net Banking", icon: "🏦", desc: "All major banks supported" },
                  { id: "WALLET", name: "Digital Wallet", icon: "👛", desc: "Google Pay, PhonePe, Paytm" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-violet-500 bg-violet-50"
                        : "border-violet-200 hover:border-violet-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-violet-600 border-gray-300 focus:ring-violet-500"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            {paymentMethod && (
              <div className="bg-white border-2 border-violet-100 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-violet-100">
                  {paymentMethod === "UPI"
                    ? "Enter UPI Details"
                    : paymentMethod === "CARD"
                    ? "Enter Card Details"
                    : paymentMethod === "NETBANKING"
                    ? "Select Your Bank"
                    : "Choose Wallet"}
                </h3>

                <div className="space-y-4">
                  {paymentMethod === "UPI" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="username@upi"
                        className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  {paymentMethod === "CARD" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "NETBANKING" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Bank <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors">
                        <option>Choose your bank</option>
                        <option>ICICI Bank</option>
                        <option>HDFC Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === "WALLET" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Wallet <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors">
                        <option>Choose your wallet</option>
                        <option>Google Pay</option>
                        <option>PhonePe</option>
                        <option>Paytm</option>
                        <option>Amazon Pay</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="bg-violet-50 rounded-xl p-4 border-l-4 border-violet-500">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-4 h-4 mt-1 text-violet-600 border-gray-300 focus:ring-violet-500" 
                />
                <span className="text-sm text-gray-700">
                  I agree to the <span className="text-violet-600 font-medium">terms and conditions</span> and <span className="text-violet-600 font-medium">privacy policy</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border-2 border-violet-100 rounded-2xl shadow-sm p-6 sticky top-24 h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-violet-100">
            Payment Summary
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">Train:</span>
              <span className="font-semibold text-gray-900">{selectedTrain?.number}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">Passengers:</span>
              <span className="font-semibold text-gray-900">{passengers.length}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">Journey Date:</span>
              <span className="font-semibold text-gray-900">{selectedTrain?.departureDate}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-t border-violet-100 pt-4">
              <span className="text-sm font-medium text-gray-600">Base Fare:</span>
              <span className="font-semibold text-gray-900">₹{(passengers.length * 2500).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">Taxes & Fees:</span>
              <span className="font-semibold text-gray-900">₹{Math.round(passengers.length * 2500 * 0.05).toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-violet-50 rounded-xl p-4 border-l-4 border-violet-500 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-violet-600">₹{totalFare.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
              processing
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {processing ? "Processing Payment..." : `Pay ₹${totalFare.toLocaleString()}`}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-green-600">🔒</span>
            <p className="text-xs text-gray-600">256-bit SSL Encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
