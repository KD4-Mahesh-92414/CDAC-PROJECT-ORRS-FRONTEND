import { useState } from "react";
import { Link, useLocation } from "react-router";
import train from "../../assets/train.png";
import { useAuth } from "../../contexts/AuthContext";

export default function BookingNavbar() {
  const { isLoggedIn, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const trainItems = [
    { label: "Group Booking", path: "/trains/group-booking" },
    { label: "PNR Status", path: "/trains/pnr-status" },
    { label: "Live Train Status", path: "/trains/live-status" },
    { label: "Cancelled Trains", path: "/trains/cancelled" },
  ];

  const helpItems = [
    { label: "How to Book", path: "/help/how-to-book" },
    { label: "Cancellation & Refund", path: "/help/cancellation-refund" },
    { label: "Travel Guidelines", path: "/help/travel-guidelines" },
    { label: "FAQs", path: "/help/faqs" },
  ];

  const accountItems = [
    { label: "My Profile", path: "/account/profile" },
    { label: "Edit Profile", path: "/account/edit-profile" },
    { label: "Change Password", path: "/account/change-password" },
    { label: "Booking History", path: "/account/bookings" },
    { label: "Payment History", path: "/account/payments" },
    { label: "Saved Passengers", path: "/account/saved-passengers" },
  ];

  const NavDropdown = ({ label, items, hasLogout = false, alignRight = false, icon }) => (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 font-medium transition-all duration-200 group">
        {icon}
        <span className="text-sm">{label}</span>
        <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`absolute top-full ${alignRight ? 'right-0' : 'left-0'} hidden group-hover:block bg-white rounded-xl shadow-xl w-56 py-2 z-50 border border-violet-200 mt-2`}>
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`block px-4 py-3 transition-all duration-200 text-sm ${
              isActive(item.path)
                ? "bg-violet-50 text-violet-700 font-semibold border-l-4 border-violet-600"
                : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
            }`}
          >
            {item.label}
          </Link>
        ))}
        {hasLogout && (
          <>
            <div className="border-t border-violet-200 my-2 mx-3"></div>
            <button
              onClick={() => logout()}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 font-medium flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <img src={train} alt="train logo" className="h-6 w-6 brightness-0 invert" />
          </div>
          <span className="text-xl font-bold text-white hidden sm:inline">Railway Reservation</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive("/")
                ? "text-white bg-white/20"
                : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
          >
            Home
          </Link>

          <NavDropdown 
            label="Trains" 
            items={trainItems} 
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <NavDropdown 
            label="Help" 
            items={helpItems} 
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          {/* Account Dropdown */}
          {isLoggedIn && (
            <NavDropdown 
              label="My Account" 
              items={accountItems} 
              hasLogout={true} 
              alignRight={true}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white/90 hover:text-white p-2 transition-colors"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-violet-800/95 backdrop-blur-sm border-t border-white/20">
          <div className="px-6 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive("/") ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/10"}`}
            >
              Home
            </Link>
            
            {/* Mobile Trains Menu */}
            <div className="space-y-2">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide px-3">Trains</p>
              {trainItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-all ${isActive(item.path) ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Help Menu */}
            <div className="space-y-2">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide px-3">Help</p>
              {helpItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-all ${isActive(item.path) ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Account Menu */}
            {isLoggedIn && (
              <div className="space-y-2 border-t border-white/20 pt-3">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wide px-3">My Account</p>
                {accountItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition-all ${isActive(item.path) ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-all text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}