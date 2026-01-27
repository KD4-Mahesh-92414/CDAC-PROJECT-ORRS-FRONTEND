import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FloatingInput } from "../../components/forms/FloatingInput";
import { loginStart, loginSuccess, loginFailure, clearError } from "../../store/slices/authSlice";
import authService from "../../services/authService";
import toast from "react-hot-toast";

const Register = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(6, "Full Name must be at least 6 characters")
      .required("Full Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[^a-zA-Z0-9]/, "Password must contain at least one symbol")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm Password is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const handleSubmit = async (values) => {
    try {
      dispatch(loginStart()); // Using loginStart for loading state
      dispatch(clearError());
      setSuccessMessage("");

      await authService.register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        cnfPassword: values.confirmPassword,
        mobile: values.mobile,
      });

      toast.success("Registration successful! Please login to continue.");
      setSuccessMessage("Registration successful! Please login to continue.");
      
      setTimeout(() => {
        onRegisterSuccess?.();
      }, 1500);
    } catch (error) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="w-96 p-6 bg-white rounded-2xl shadow-2xl">
        <h1 className="font-bold text-3xl text-violet-600 text-center mb-2">
          Register
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Create your Railway Reservation account
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {successMessage}
          </div>
        )}

        <FloatingInput
          label="Full Name"
          type="text"
          name="fullName"
          icon={UserIcon}
          colorScheme="violet"
        />
        <FloatingInput
          label="Email"
          type="email"
          name="email"
          icon={EnvelopeIcon}
          colorScheme="violet"
        />
        <FloatingInput
          label="Password"
          type="password"
          name="password"
          icon={LockClosedIcon}
          colorScheme="violet"
        />
        <FloatingInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          icon={LockClosedIcon}
          colorScheme="violet"
        />
        <FloatingInput
          label="Mobile"
          type="number"
          name="mobile"
          icon={PhoneIcon}
          colorScheme="violet"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => onRegisterSuccess?.()}
              className="text-violet-600 font-semibold hover:text-violet-700 transition"
            >
              Login here
            </button>
          </p>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
