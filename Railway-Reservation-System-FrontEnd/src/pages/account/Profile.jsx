import { useState } from "react";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();
  const [profile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    dob: "1990-05-15",
    gender: "Male",
    aadhar: "XXXX XXXX 1234",
    address: "123 Main Street, New Delhi, 110001",
    joinDate: "2023-01-15",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-lg text-gray-600">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-violet-600 to-violet-700 h-32"></div>
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6">
              <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                RK
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.name}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.dob}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.gender}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Member Since</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.joinDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t-2 border-violet-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.email}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="border-t-2 border-violet-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Address
                </h3>
                <div className="bg-violet-50 rounded-xl p-4">
                  <p className="text-gray-900">{profile.address}</p>
                </div>
              </div>

              {/* Identification */}
              <div className="border-t-2 border-violet-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Identification
                </h3>
                <div className="bg-violet-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Aadhar Number</p>
                  <p className="text-lg font-bold text-gray-900">
                    {profile.aadhar}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t-2 border-violet-100 pt-6 flex gap-4">
                <button
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-300"
                  onClick={() => navigate("/account/edit-profile")}
                >
                  Edit Profile
                </button>
                <button className="flex-1 bg-white border-2 border-violet-600 hover:bg-violet-50 text-violet-600 font-bold py-3 rounded-xl transition-all duration-300">
                  Download Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Bookings", value: "12", icon: "🎫" },
            { label: "Amount Spent", value: "₹15,450", icon: "💰" },
            { label: "Trips Completed", value: "11", icon: "✈️" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6 text-center hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-violet-600">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
