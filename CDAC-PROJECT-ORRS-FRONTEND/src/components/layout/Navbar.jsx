import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import train from "../../assets/train.png";
import Modal from "../common/Modal";
import { Login } from "../../pages/auth/Login";

/**
 * Navbar Component
 * Responsibility: Navigation with simplified menu structure and Redux integration
 */
export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
  };

  // Simplified navigation items as per requirements
  const trainItems = [
    { label: "PNR Status", path: "/trains/pnr-status" },
    { label: "Cancelled Trains", path: "/trains/cancelled" },
  ];

  const helpItems = [
    { label: "How to Book", path: "/help/how-to-book" },
    { label: "FAQs", path: "/help/faqs" },
  ];

  const contactItems = [
    { label: "Customer Support", path: "/contact/support" },
    { label: "Feedback", path: "/contact/feedback" },
  ];

  const accountItems = [
    { label: "My Profile", path: "/account/profile" },
    { label: "Edit Profile", path: "/account/edit-profile" },
    { label: "Booking History", path: "/account/bookings" },
    { label: "Change Password", path: "/account/change-password" },
  ];

  const NavDropdown = ({
    label,
    items,
    hasLogout = false,
    alignRight = false,
    icon,
  }) => (
    <div className="relative group ">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-violet-600 hover:bg-violet-50 font-medium transition-all duration-200 group">
        {icon}
        <span>{label}</span>
        <svg
          className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute top-full ${
          alignRight ? "right-0" : "left-0"
        } opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gradient-to-br from-white to-violet-50 rounded-xl shadow-2xl w-64 py-4 z-50 border border-violet-200 mt-2 transition-all duration-200 backdrop-blur-sm`}
      >
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`block px-5 py-3 transition-all duration-200 text-sm font-medium rounded-lg mx-2 ${
              isActive(item.path)
                ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-md transform scale-105"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-violet-100 hover:to-violet-200 hover:text-violet-700 hover:transform hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  isActive(item.path) ? "bg-white" : "bg-violet-400"
                }`}
              ></div>
              {item.label}
            </div>
          </Link>
        ))}
        {hasLogout && (
          <>
            <div className="border-t border-violet-300 my-3 mx-3"></div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-5 py-3 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 font-medium flex items-center gap-3 text-sm rounded-lg mx-2 hover:transform hover:scale-105"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-violet-50 py-4">
      <nav className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4 mx-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-md">
              <img src={train} alt="train logo" className="h-6 w-6 invert" />
            </div>
            <span className="text-xl font-bold text-violet-700 hidden sm:inline">
              Railway Reservation
            </span>
          </Link>

          {/* Simplified Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive("/")
                  ? "text-violet-600 font-semibold bg-violet-50"
                  : "text-gray-700 hover:text-violet-600 hover:bg-violet-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/admin"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                location.pathname.startsWith("/admin")
                  ? "text-violet-600 font-semibold bg-violet-50"
                  : "text-gray-700 hover:text-violet-600 hover:bg-violet-50"
              }`}
            >
              Admin
            </Link>

            {isAuthenticated && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname.startsWith("/admin")
                    ? "text-violet-600 font-semibold bg-violet-50"
                    : "text-gray-700 hover:text-violet-600 hover:bg-violet-50"
                }`}
              >
                Admin
              </Link>
            )}

            <NavDropdown
              label="Trains"
              items={trainItems}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
            />
            <NavDropdown
              label="Help"
              items={helpItems}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <NavDropdown
              label="Contact"
              items={contactItems}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
            />
          </div>

          {/* Account & Login */}
          <div className="flex items-center gap-4">
            {/* Account Dropdown */}
            {isAuthenticated && (
              <div className="hidden lg:block">
                <NavDropdown
                  label={user?.fullName || "My Account"}
                  items={accountItems}
                  hasLogout={true}
                  alignRight={true}
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                />
              </div>
            )}

            {/* Login Button */}
            {!isAuthenticated && (
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white text-sm flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-violet-600 hover:text-violet-700 p-2 rounded-lg hover:bg-violet-50 transition-all duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* LOGIN MODAL */}
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <Login
          onLoginSuccess={() => {
            setShowLogin(false);
          }}
        />
      </Modal>
    </div>
  );
}
