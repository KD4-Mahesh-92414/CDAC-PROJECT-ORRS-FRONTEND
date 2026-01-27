import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authService from "../../services/authService";
import { setUser } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile number is required"),
  dob: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  aadharNo: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar number must be 12 digits")
    .required("Aadhar number is required"),
});

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    aadharNo: "",
  });

  // Fetch current user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to edit profile');
          navigate('/login');
          return;
        }

        console.log('EditProfile: Fetching current user data...');
        const response = await authService.getProfile();
        const userData = response.data || response;

        if (userData) {
          // Format date for input field (YYYY-MM-DD)
          const formattedDob = userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '';
          
          setInitialValues({
            fullName: userData.fullName || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            dob: formattedDob,
            gender: userData.gender || "",
            address: userData.address || "",
            aadharNo: userData.aadharNo || "",
          });
          
          console.log('EditProfile: User data loaded successfully');
        }
      } catch (error) {
        console.error('EditProfile: Error fetching profile:', error);
        toast.error('Failed to load profile data');
        if (error.message?.includes('401') || error.message?.includes('authentication')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleSubmit = async (values) => {
    try {
      setUpdating(true);
      console.log('EditProfile: Updating profile with:', values);

      const response = await authService.updateProfile(values);
      
      if (response) {
        // Update Redux store with new user data
        dispatch(setUser(values));
        toast.success('Profile updated successfully!');
        navigate('/account/profile');
      }
    } catch (error) {
      console.error('EditProfile: Update error:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate('/account/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Edit Profile</h1>
            <p className="text-lg text-gray-600">Loading your profile information...</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Edit Profile
          </h1>
          <p className="text-lg text-gray-600">
            Update your personal information
          </p>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.fullName && errors.fullName
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {touched.fullName && errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.dob && errors.dob
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.dob && errors.dob && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dob}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.gender && errors.gender
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                      {touched.gender && errors.gender && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.email && errors.email
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="Enter your email"
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.mobile && errors.mobile
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="Enter 10-digit mobile number"
                      />
                      {touched.mobile && errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={3}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors resize-none ${
                          touched.address && errors.address
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="Enter your complete address"
                      />
                      {touched.address && errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Identification */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Identification
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Aadhar Number *
                      </label>
                      <input
                        type="text"
                        name="aadharNo"
                        value={values.aadharNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.aadharNo && errors.aadharNo
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="Enter 12-digit Aadhar number"
                        maxLength={12}
                      />
                      {touched.aadharNo && errors.aadharNo && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.aadharNo}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t-2 border-violet-100 pt-6 flex gap-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? "Saving Changes..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={updating}
                    className="flex-1 bg-white border-2 border-violet-600 hover:bg-violet-50 text-violet-600 font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
