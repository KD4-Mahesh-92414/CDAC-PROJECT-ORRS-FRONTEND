import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authService from "../../services/authService";
import { setUser } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Debug: Check authentication state
        const token = localStorage.getItem('token');
        
        console.log('Profile Debug - Auth state:', {
          token: token ? 'Present' : 'Missing',
          tokenLength: token?.length,
          tokenPreview: token ? `${token.substring(0, 30)}...` : 'No token',
          reduxUser: user
        });
        
        if (!token) {
          throw new Error('No authentication token found. Please login again.');
        }
        
        console.log('Profile Debug - Fetching user profile...');
        
        // Fetch profile data from backend
        const response = await authService.getProfile();
        
        console.log('Profile Debug - API response:', response);
        
        // Backend should return user data directly or in a data field
        const userData = response.data || response;
        
        if (userData) {
          setProfile(userData);
          // Update Redux store with fresh user data
          dispatch(setUser(userData));
          console.log('Profile Debug - Profile data loaded successfully:', userData);
        } else {
          throw new Error('No user data received from server');
        }
        
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message || "Failed to load profile data");
        toast.error(err.message || "Failed to load profile data");
        
        // If it's an authentication error, redirect to login
        if (err.message?.includes('token') || err.message?.includes('authentication') || err.message?.includes('401')) {
          console.log('Profile Debug - Authentication error detected, redirecting to login...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [dispatch]); // Only depend on dispatch, not user

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format gender for display
  const formatGender = (gender) => {
    if (!gender) return "Not provided";
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  };

  // Format preferred class for display
  const formatPrefClass = (prefClass) => {
    if (!prefClass) return "Not provided";
    return prefClass.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
            <p className="text-lg text-gray-600">Loading your account information...</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-violet-600 to-violet-700 h-32"></div>
            <div className="px-8 pb-8">
              <div className="relative -mt-16 mb-6">
                <div className="h-32 w-32 rounded-2xl bg-gray-300 animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
            <p className="text-lg text-red-600">Error loading profile data</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg shadow-red-200 overflow-hidden mb-8 p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Profile</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main profile display
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
                {getUserInitials(profile?.fullName)}
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
                      {profile?.fullName || "Not provided"}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDate(profile?.dob)}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatGender(profile?.gender)}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Preferred Class</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrefClass(profile?.prefClass)}
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
                      {profile?.email || "Not provided"}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile?.mobile || "Not provided"}
                    </p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4 sm:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile?.address || "Not provided"}
                    </p>
                  </div>
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
                    {profile?.aadharNo || "Not provided"}
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
                <button 
                  className="flex-1 bg-white border-2 border-violet-600 hover:bg-violet-50 text-violet-600 font-bold py-3 rounded-xl transition-all duration-300"
                  onClick={() => navigate("/account/change-password")}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
