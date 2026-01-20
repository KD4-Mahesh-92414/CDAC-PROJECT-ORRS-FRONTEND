import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  groupSize: Yup.number()
    .min(10, "Minimum 10 passengers required")
    .max(500, "Maximum 500 passengers allowed")
    .required("Group size is required")
    .typeError("Group size must be a number"),
  departureDate: Yup.string().required("Departure date is required"),
  fromStation: Yup.string()
    .min(2, "From station must be at least 2 characters")
    .required("From station is required"),
  toStation: Yup.string()
    .min(2, "To station must be at least 2 characters")
    .required("To station is required"),
  groupLeaderEmail: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Group leader email is required"),
  groupLeaderPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Contact number is required"),
});

export default function GroupBooking() {
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const initialValues = {
    groupSize: "",
    departureDate: "",
    fromStation: "",
    toStation: "",
    groupLeaderEmail: "",
    groupLeaderPhone: "",
  };

  const calculateDiscount = (size) => {
    const numSize = parseInt(size);
    if (numSize >= 50) return 15;
    if (numSize >= 30) return 12;
    if (numSize >= 20) return 10;
    if (numSize >= 10) return 5;
    return 0;
  };

  const handleSubmit = (values) => {
    console.log("Group booking submitted:", values);
    setDiscountPercentage(calculateDiscount(values.groupSize));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Group Booking
          </h1>
          <p className="text-lg text-gray-600">
            Book tickets in bulk with exclusive group discounts
          </p>
        </div>

        {/* Main Content Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Group Size *
                      </label>
                      <input
                        type="number"
                        name="groupSize"
                        value={values.groupSize}
                        onChange={(e) => {
                          handleChange(e);
                          setDiscountPercentage(
                            calculateDiscount(e.target.value)
                          );
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.groupSize && errors.groupSize
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="Minimum 10 passengers"
                      />
                      {touched.groupSize && errors.groupSize && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.groupSize}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Departure Date *
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        value={values.departureDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.departureDate && errors.departureDate
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.departureDate && errors.departureDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.departureDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        From Station *
                      </label>
                      <input
                        type="text"
                        name="fromStation"
                        value={values.fromStation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.fromStation && errors.fromStation
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="e.g., New Delhi"
                      />
                      {touched.fromStation && errors.fromStation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fromStation}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        To Station *
                      </label>
                      <input
                        type="text"
                        name="toStation"
                        value={values.toStation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.toStation && errors.toStation
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                        placeholder="e.g., Mumbai Central"
                      />
                      {touched.toStation && errors.toStation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.toStation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Group Leader Email *
                    </label>
                    <input
                      type="email"
                      name="groupLeaderEmail"
                      value={values.groupLeaderEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                        touched.groupLeaderEmail && errors.groupLeaderEmail
                          ? "border-red-400"
                          : "border-violet-200"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {touched.groupLeaderEmail && errors.groupLeaderEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.groupLeaderEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="groupLeaderPhone"
                      value={values.groupLeaderPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                        touched.groupLeaderPhone && errors.groupLeaderPhone
                          ? "border-red-400"
                          : "border-violet-200"
                      }`}
                      placeholder="10 digit mobile number"
                    />
                    {touched.groupLeaderPhone && errors.groupLeaderPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.groupLeaderPhone}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-300"
                  >
                    Submit Group Booking Request
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Benefits & Discount Card */}
          <div className="space-y-6">
            {/* Discount Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Discount Estimate
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-violet-100">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-bold text-violet-600">
                    {discountPercentage === 0
                      ? "Enter size"
                      : `${discountPercentage} passengers`}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-violet-100">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-bold text-green-600">
                    {discountPercentage}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Our team will contact you within 24 hours to confirm your
                  booking.
                </p>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-violet-600 font-bold mr-3">✓</span>
                  <span className="text-gray-600 text-sm">
                    Exclusive group discounts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 font-bold mr-3">✓</span>
                  <span className="text-gray-600 text-sm">
                    Priority ticket confirmation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 font-bold mr-3">✓</span>
                  <span className="text-gray-600 text-sm">
                    Dedicated support team
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-600 font-bold mr-3">✓</span>
                  <span className="text-gray-600 text-sm">
                    Flexible payment options
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Discount Slabs Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Discount Slabs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { size: "10-19", discount: "5%" },
              { size: "20-29", discount: "10%" },
              { size: "30-49", discount: "12%" },
              { size: "50+", discount: "15%" },
            ].map((slab, idx) => (
              <div
                key={idx}
                className="border-2 border-violet-200 rounded-xl p-4 text-center hover:bg-violet-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-2">Passengers</p>
                <p className="font-bold text-gray-900 mb-3">{slab.size}</p>
                <p className="text-2xl font-bold text-violet-600">
                  {slab.discount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
