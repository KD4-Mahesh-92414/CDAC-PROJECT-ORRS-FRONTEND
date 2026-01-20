import { useState } from "react";

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed");
  };

  const toggleShow = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Change Password
          </h1>
          <p className="text-lg text-gray-600">
            Secure your account by updating your password regularly
          </p>
        </div>

        {/* Change Password Form */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none transition-colors"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => toggleShow("current")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                >
                  {showPasswords.current ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <a
                href="#"
                className="text-sm text-violet-600 hover:text-violet-700 mt-2 inline-block"
              >
                Forgot password?
              </a>
            </div>

            {/* New Password */}
            <div className="border-t-2 border-violet-100 pt-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                New Password *
              </label>
              <div className="relative mb-4">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none transition-colors"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => toggleShow("new")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                >
                  {showPasswords.new ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-semibold">
                  Password Requirements:
                </p>
                <div className="space-y-1">
                  {[
                    {
                      label: "At least 8 characters",
                      met: passwords.newPassword.length >= 8,
                    },
                    {
                      label: "Contains uppercase letter",
                      met: /[A-Z]/.test(passwords.newPassword),
                    },
                    {
                      label: "Contains lowercase letter",
                      met: /[a-z]/.test(passwords.newPassword),
                    },
                    {
                      label: "Contains number",
                      met: /[0-9]/.test(passwords.newPassword),
                    },
                    {
                      label: "Contains special character",
                      met: /[!@#$%^&*]/.test(passwords.newPassword),
                    },
                  ].map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-full flex items-center justify-center text-xs ${
                          req.met ? "bg-green-500 text-white" : "bg-gray-300"
                        }`}
                      >
                        {req.met ? "✓" : ""}
                      </span>
                      <span
                        className={`text-xs ${
                          req.met ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="border-t-2 border-violet-100 pt-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none transition-colors"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => toggleShow("confirm")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                >
                  {showPasswords.confirm ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {passwords.newPassword &&
                passwords.confirmPassword &&
                passwords.newPassword === passwords.confirmPassword && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    ✓ Passwords match
                  </p>
                )}
            </div>

            {/* Security Info */}
            <div className="border-t-2 border-violet-100 pt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Security Tip:</strong> Never share your password with
                anyone. We will never ask for your password via email or phone.
                Always use a strong, unique password.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="border-t-2 border-violet-100 pt-6 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-300"
              >
                Change Password
              </button>
              <button
                type="button"
                className="flex-1 bg-white border-2 border-violet-600 hover:bg-violet-50 text-violet-600 font-bold py-3 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Login Activity
          </h3>
          <div className="space-y-3">
            {[
              {
                device: "Chrome on Windows",
                location: "New Delhi, India",
                time: "2 hours ago",
              },
              {
                device: "Safari on iPhone",
                location: "New Delhi, India",
                time: "1 day ago",
              },
              {
                device: "Chrome on Windows",
                location: "Mumbai, India",
                time: "3 days ago",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-4 bg-violet-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {activity.device}
                  </p>
                  <p className="text-sm text-gray-500">{activity.location}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
