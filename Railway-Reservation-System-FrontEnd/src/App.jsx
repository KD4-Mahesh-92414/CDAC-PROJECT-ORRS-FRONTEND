import { Routes, Route, useLocation } from "react-router";
import { Suspense, lazy } from "react";

// Main Pages
import HomePage from "./pages/HomePage";
import { Login } from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HeaderLayout from "./components/layout/HeaderLayout";
import Navbar from "./components/layout/Navbar";

// Booking Flow Pages
import TrainSearchResults from "./pages/booking/TrainSearchResults";
import NewSeatSelection from "./pages/booking/NewSeatSelection";
import PassengerDetails from "./pages/booking/PassengerDetails";
import ReservationReview from "./pages/booking/ReservationReview";
import Payment from "./pages/booking/Payment";
import BookingConfirmation from "./pages/booking/Confirmation";

// Lazy load all other pages
const GroupBooking = lazy(() => import("./pages/trains/GroupBooking"));
const PNRStatus = lazy(() => import("./pages/trains/PNRStatus"));
const LiveTrainStatus = lazy(() => import("./pages/trains/LiveTrainStatus"));
const CancelledTrains = lazy(() => import("./pages/trains/CancelledTrains"));

const HowToBook = lazy(() => import("./pages/help/HowToBook"));
const CancellationRefund = lazy(() =>
  import("./pages/help/CancellationRefund")
);
const TatkalRules = lazy(() => import("./pages/help/TatkalRules"));
const TravelGuidelines = lazy(() => import("./pages/help/TravelGuidelines"));
const FAQs = lazy(() => import("./pages/help/FAQs"));

const Profile = lazy(() => import("./pages/account/Profile"));
const EditProfile = lazy(() => import("./pages/account/EditProfile"));
const ChangePassword = lazy(() => import("./pages/account/ChangePassword"));
const Bookings = lazy(() => import("./pages/account/Bookings"));
const PaymentHistory = lazy(() => import("./pages/account/PaymentHistory"));
const SavedPassengers = lazy(() => import("./pages/account/SavedPassengers"));

const CustomerSupport = lazy(() => import("./pages/contact/CustomerSupport"));
const Feedback = lazy(() => import("./pages/contact/Feedback"));
const EmergencyHelpline = lazy(() =>
  import("./pages/contact/EmergencyHelpline")
);

// Loading Fallback Component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-violet-600 text-lg">Loading...</div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  
  // Booking flow pages that need HeaderLayout with search bar
  const bookingFlowPages = ['/trains', '/seats', '/passengers', '/review', '/payment'];
  const isBookingFlow = bookingFlowPages.includes(location.pathname);
  
  // Pages that don't need any navbar
  const noNavbarPages = ['/login', '/register', '/confirmation'];
  const hideNavbar = noNavbarPages.includes(location.pathname);
  
  return (
    <>
      {/* Show HeaderLayout only for booking flow */}
      {isBookingFlow && <HeaderLayout />}
      
      {/* Show regular Navbar for all other pages except auth and confirmation */}
      {!isBookingFlow && !hideNavbar && <Navbar />}
      
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Booking Flow Routes */}
          <Route path="/trains" element={<TrainSearchResults />} />
          <Route path="/seats" element={<NewSeatSelection />} />
          <Route path="/passengers" element={<PassengerDetails />} />
          <Route path="/review" element={<ReservationReview />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />

          {/* Other Train Routes */}
          <Route path="/trains/group-booking" element={<GroupBooking />} />
          <Route path="/trains/pnr-status" element={<PNRStatus />} />
          <Route path="/trains/live-status" element={<LiveTrainStatus />} />
          <Route path="/trains/cancelled" element={<CancelledTrains />} />

          {/* Help & Booking Guide Routes */}
          <Route path="/help/how-to-book" element={<HowToBook />} />
          <Route
            path="/help/cancellation-refund"
            element={<CancellationRefund />}
          />
          <Route path="/help/tatkal-rules" element={<TatkalRules />} />
          <Route
            path="/help/travel-guidelines"
            element={<TravelGuidelines />}
          />
          <Route path="/help/faqs" element={<FAQs />} />

          {/* Account Routes */}
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/edit-profile" element={<EditProfile />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/payments" element={<PaymentHistory />} />
          <Route
            path="/account/saved-passengers"
            element={<SavedPassengers />}
          />

          {/* Contact Routes */}
          <Route path="/contact/support" element={<CustomerSupport />} />
          <Route path="/contact/feedback" element={<Feedback />} />
          <Route path="/contact/emergency" element={<EmergencyHelpline />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
