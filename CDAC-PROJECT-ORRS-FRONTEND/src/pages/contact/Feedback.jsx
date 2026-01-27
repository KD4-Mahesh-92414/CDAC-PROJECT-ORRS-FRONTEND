import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  rating: Yup.string().required("Rating is required"),
  service: Yup.string().required("Service is required"),
  feedback: Yup.string()
    .min(10, "Feedback must be at least 10 characters")
    .required("Feedback is required"),
  contactMe: Yup.boolean(),
});

export default function Feedback() {
  const initialValues = {
    name: "",
    email: "",
    rating: "5",
    service: "booking",
    feedback: "",
    contactMe: false,
  };

  const handleSubmit = (values) => {
    console.log("Feedback submitted", values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Feedback
          </h1>
          <p className="text-lg text-gray-600">
            Help us improve by sharing your valuable feedback and suggestions
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue, handleChange }) => (
              <Form className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    About You
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Rating */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Your Experience
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Which service did you use? *
                      </label>
                      <select
                        name="service"
                        value={values.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none"
                      >
                        <option value="booking">Ticket Booking</option>
                        <option value="cancellation">Cancellation</option>
                        <option value="pnr">PNR Status</option>
                        <option value="payment">Payment</option>
                        <option value="support">Customer Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Overall Rating *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setFieldValue("rating", star.toString())
                            }
                            className={`text-3xl transition-transform hover:scale-125 ${
                              parseInt(values.rating) >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {
                          ["Poor", "Fair", "Good", "Very Good", "Excellent"][
                            parseInt(values.rating) - 1
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Your Feedback *
                  </label>
                  <textarea
                    name="feedback"
                    value={values.feedback}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us what you liked or disliked about our service..."
                    className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:border-violet-600 focus:outline-none resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {values.feedback.length}/500 characters
                  </p>
                </div>
                {/* Checkbox */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="contactMe"
                      checked={values.contactMe}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-2 border-violet-200"
                    />
                    <span className="text-sm text-gray-700">
                      You can contact me regarding this feedback
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-violet-300"
                  >
                    Submit Feedback
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
