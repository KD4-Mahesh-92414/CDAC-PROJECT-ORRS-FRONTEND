import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingRef = location.state?.bookingRef;
  const totalFare = location.state?.totalFare;

  useEffect(() => {
    if (!bookingRef) {
      navigate("/");
    }
  }, [bookingRef, navigate]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-12">
      {/* Success Card */}
      <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <svg
              className="w-10 h-10 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your train reservation has been successfully completed
        </p>

        {/* Booking Reference */}
        <div className="bg-violet-50 rounded-xl p-6 mb-8 border-2 border-violet-200">
          <p className="text-sm text-gray-600 mb-2">Booking Reference Number</p>
          <p className="text-3xl font-bold text-violet-600 font-mono">
            {bookingRef}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Save this reference for further updates and cancellations
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
          <div>
            <p className="text-sm text-gray-600">Total Amount Paid</p>
            <p className="text-2xl font-bold text-violet-600">₹{totalFare}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Booking Status</p>
            <p className="text-lg font-bold text-green-600">Confirmed</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Confirmation Email</p>
            <p className="text-sm text-gray-900">
              maheshraipaiwar2001@gmail.com
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500 mb-8 text-left">
          <h3 className="font-bold text-gray-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              ✓ A confirmation email has been sent to your registered email
            </li>
            <li>✓ Download and print the e-ticket or show it on your mobile</li>
            <li>✓ Keep your booking reference for check-in at the station</li>
            <li>✓ Reach the station 30 minutes before departure</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/account/bookings")}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-white border-2 border-violet-600 text-violet-600 hover:bg-violet-50 font-bold rounded-xl transition-colors"
          >
            Book Another Train
          </button>
        </div>
      </div>

      {/* Important Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            📄 Important Documents
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• E-Ticket (sent to your email)</li>
            <li>• Journey details PDF</li>
            <li>• Cancellation policy</li>
            <li>• Passenger list</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            ❓ Need Help?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📞 Customer Support: 1800-123-456</li>
            <li>📧 Email: support@railway.com</li>
            <li>💬 Live Chat: Available 24/7</li>
            <li>🏠 Visit: Your nearest station</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
