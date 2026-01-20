import { Formik, Form } from "formik";
import * as Yup from "yup";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FloatingInput } from "../../components/forms/FloatingInput";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  dob: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .required("City is required"),
  state: Yup.string()
    .min(2, "State must be at least 2 characters")
    .required("State is required"),
  zip: Yup.string()
    .matches(/^[0-9]{6}$/, "Zip code must be 6 digits")
    .required("Zip code is required"),
});

export default function EditProfile() {
  const initialValues = {
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    phone: "9876543210",
    dob: "1990-05-15",
    gender: "Male",
    address: "123 Main Street",
    city: "New Delhi",
    state: "Delhi",
    zip: "110001",
  };

  const handleSubmit = (values) => {
    console.log("Profile updated:", values);
    // Handle form submission
  };

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
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-6">
                {/* Name Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Name</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.firstName && errors.firstName
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.firstName && errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.lastName && errors.lastName
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.lastName && errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
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
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.phone && errors.phone
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      {touched.gender && errors.gender && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.address && errors.address
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.address && errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                            touched.city && errors.city
                              ? "border-red-400"
                              : "border-violet-200"
                          }`}
                        />
                        {touched.city && errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                            touched.state && errors.state
                              ? "border-red-400"
                              : "border-violet-200"
                          }`}
                        />
                        {touched.state && errors.state && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.zip && errors.zip
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.zip && errors.zip && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zip}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t-2 border-violet-100 pt-6 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-300"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-white border-2 border-violet-600 hover:bg-violet-50 text-violet-600 font-bold py-3 rounded-xl transition-all duration-300"
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
