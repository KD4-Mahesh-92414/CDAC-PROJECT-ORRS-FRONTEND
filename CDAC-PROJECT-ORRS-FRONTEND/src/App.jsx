import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

// Redux Store
import store from "./store";
import { initializeAuth } from "./store/slices/authSlice";

// Protected Route Guard
import ProtectedRoute from "./components/guards/ProtectedRoute";

// Non-lazy components (critical for initial load)
import HeaderLayout from "./components/layout/HeaderLayout";
import Navbar from "./components/layout/Navbar";

// Lazy load ALL page components for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/auth/Login").then(module => ({ default: module.Login })));
const Register = lazy(() => import("./pages/auth/Register"));

// Admin Pages
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const StationManagement = lazy(() => import("./admin/pages/StationManagement"));
const TrainManagement = lazy(() => import("./admin/pages/TrainManagement"));
const UserManagement = lazy(() => import("./admin/pages/UserManagement"));
const FareStructure = lazy(() => import("./admin/pages/FareStructure"));
const RefundTransaction = lazy(() => import("./admin/pages/RefundTransaction"));
const CreateAnnouncement = lazy(() => import("./admin/pages/CreateAnnouncement"));

// Booking Flow Pages
const TrainSearchResults = lazy(() => import("./pages/booking/TrainSearchResults"));
const NewSeatSelection = lazy(() => import("./pages/booking/NewSeatSelection"));
const PassengerDetails = lazy(() => import("./pages/booking/PassengerDetails"));
const ReservationReview = lazy(() => import("./pages/booking/ReservationReview"));
const Payment = lazy(() => import("./pages/booking/Payment"));
const BookingConfirmation = lazy(() => import("./pages/booking/Confirmation"));

// Lazy load all other pages
const GroupBooking = lazy(() => import("./pages/trains/GroupBooking"));
const PNRStatus = lazy(() => import("./pages/trains/PNRStatus"));
const LiveTrainStatus = lazy(() => import("./pages/trains/LiveTrainStatus"));
const CancelledTrains = lazy(() => import("./pages/trains/CancelledTrains"));

const HowToBook = lazy(() => import("./pages/help/HowToBook"));
const CancellationRefund = lazy(() => import("./pages/help/CancellationRefund"));
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
const EmergencyHelpline = lazy(() => import("./pages/contact/EmergencyHelpline"));

/**
 * Loading Fallback Component
 * Responsibility: Show loading state during lazy component loading
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
        <div className="text-violet-600 text-lg">Loading page...</div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Initialize auth state from localStorage on app start
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  
  // Booking flow pages that need HeaderLayout with search bar
  const bookingFlowPages = ['/trains', '/seats', '/passengers', '/review', '/payment'];
  const isBookingFlow = bookingFlowPages.includes(location.pathname);
  
  // Pages that don't need any navbar
  const noNavbarPages = ['/login', '/register', '/confirmation'];
  const hideNavbar = noNavbarPages.includes(location.pathname);
  
  // Admin pages
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return (
    <>
      {/* Show HeaderLayout only for booking flow */}
      {isBookingFlow && <HeaderLayout />}
      
      {/* Show regular Navbar for all other pages except auth, confirmation, and admin */}
      {!isBookingFlow && !hideNavbar && !isAdminPage && <Navbar />}
      
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public Train Routes */}
          <Route path="/trains/pnr-status" element={<PNRStatus />} />
          <Route path="/trains/cancelled" element={<CancelledTrains />} />

          {/* Public Help Routes */}
          <Route path="/help/how-to-book" element={<HowToBook />} />
          <Route path="/help/faqs" element={<FAQs />} />

          {/* Public Contact Routes */}
          <Route path="/contact/support" element={<CustomerSupport />} />
          <Route path="/contact/feedback" element={<Feedback />} />

          {/* Protected Booking Flow Routes */}
          <Route 
            path="/trains" 
            element={
              <ProtectedRoute>
                <TrainSearchResults />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/seats" 
            element={
              <ProtectedRoute>
                <NewSeatSelection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/passengers" 
            element={
              <ProtectedRoute>
                <PassengerDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/review" 
            element={
              <ProtectedRoute>
                <ReservationReview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/confirmation" 
            element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            } 
          />

          {/* Protected Account Routes */}
          <Route 
            path="/account/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account/edit-profile" 
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account/change-password" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account/bookings" 
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account/payments" 
            element={
              <ProtectedRoute>
                <PaymentHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account/saved-passengers" 
            element={
              <ProtectedRoute>
                <SavedPassengers />
              </ProtectedRoute>
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/stations" 
            element={
              <ProtectedRoute>
                <StationManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/trains" 
            element={
              <ProtectedRoute>
                <TrainManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/fares" 
            element={
              <ProtectedRoute>
                <FareStructure />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/refunds" 
            element={
              <ProtectedRoute>
                <RefundTransaction />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/announcements" 
            element={
              <ProtectedRoute>
                <CreateAnnouncement />
              </ProtectedRoute>
            } 
          />

          {/* Other Protected Routes */}
          <Route 
            path="/trains/group-booking" 
            element={
              <ProtectedRoute>
                <GroupBooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trains/live-status" 
            element={
              <ProtectedRoute>
                <LiveTrainStatus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help/cancellation-refund" 
            element={
              <ProtectedRoute>
                <CancellationRefund />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help/tatkal-rules" 
            element={
              <ProtectedRoute>
                <TatkalRules />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help/travel-guidelines" 
            element={
              <ProtectedRoute>
                <TravelGuidelines />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contact/emergency" 
            element={
              <ProtectedRoute>
                <EmergencyHelpline />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
