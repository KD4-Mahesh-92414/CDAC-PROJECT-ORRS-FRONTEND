import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  age: Yup.number()
    .min(1, "Age must be at least 1")
    .max(200, "Age must be 200 or less")
    .required("Age is required")
    .typeError("Age must be a number"),
  gender: Yup.string().required("Gender is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be exactly 10 digits")
    .required("Mobile number is required"),
  aadhar: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar must be exactly 12 digits")
    .required("Aadhar number is required"),
});

export default function SavedPassengers() {
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 35,
      gender: "Male",
      aadhar: "XXXX XXXX 1234",
      mobile: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Priya Kumar",
      age: 32,
      gender: "Female",
      aadhar: "XXXX XXXX 5678",
      mobile: "+91 87654 32109",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    aadhar: "",
    mobile: "",
  });

  const handleAddNew = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({ name: "", age: "", gender: "Male", aadhar: "", mobile: "" });
  };

  const handleEdit = (passenger) => {
    setEditingId(passenger.id);
    setFormData(passenger);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this passenger?")) {
      setPassengers(passengers.filter((p) => p.id !== id));
    }
  };

  const handleFormSubmit = (values) => {
    if (editingId) {
      setPassengers(
        passengers.map((p) =>
          p.id === editingId ? { ...values, id: editingId } : p
        )
      );
    } else {
      setPassengers([...passengers, { ...values, id: Date.now() }]);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Saved Passengers
            </h1>
            <p className="text-lg text-gray-600">
              Manage passenger details for quick bookings
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-violet-300"
          >
            + Add Passenger
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Passenger" : "Add New Passenger"}
            </h2>
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
              enableReinitialize={true}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="space-y-6">
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
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.name && errors.name
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                          touched.age && errors.age
                            ? "border-red-400"
                            : "border-violet-200"
                        }`}
                      />
                      {touched.age && errors.age && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.age}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Mobile *
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
                        placeholder="10 digit mobile number"
                      />
                      {touched.mobile && errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Aadhar Number *
                    </label>
                    <input
                      type="text"
                      name="aadhar"
                      value={values.aadhar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                        touched.aadhar && errors.aadhar
                          ? "border-red-400"
                          : "border-violet-200"
                      }`}
                      placeholder="12 digit Aadhar number"
                    />
                    {touched.aadhar && errors.aadhar && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.aadhar}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      Save Passenger
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/* Passengers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passengers.map((passenger) => (
            <div
              key={passenger.id}
              className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                    {passenger.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {passenger.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {passenger.gender} • Age {passenger.age}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(passenger)}
                    className="p-2 hover:bg-violet-50 rounded-lg text-violet-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(passenger.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2 border-t border-violet-100 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Mobile</span>
                  <span className="font-semibold text-gray-900">
                    {passenger.mobile}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Aadhar</span>
                  <span className="font-semibold text-gray-900">
                    {passenger.aadhar}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {passengers.length === 0 && !showForm && (
          <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Passengers Saved
            </h3>
            <p className="text-gray-600 mb-6">
              Add passenger details for faster booking in the future
            </p>
            <button
              onClick={handleAddNew}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3 rounded-xl"
            >
              Add First Passenger
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">
            💡 Why Save Passengers?
          </h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Faster checkout process during booking</li>
            <li>• No need to re-enter details for every booking</li>
            <li>• Manage details for family and friends</li>
            <li>• Keep all travel history in one place</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
