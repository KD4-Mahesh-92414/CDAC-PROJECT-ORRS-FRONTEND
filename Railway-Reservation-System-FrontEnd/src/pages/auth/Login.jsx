// import loginImg from "../assets/login.jpg";
// import loginImg1 from "../assets/login1.jpg";
// import { FloatingInput } from "./FloatingInput";
// export const Login = () => {
//   return (
//     <div className="grid grid-cols-5 bg-black gap-2 h-screen p-2 ">
//       <div className="col-span-2 bg-blue-300 rounded-2xl">
//         <img
//           src={loginImg1}
//           alt="Login Image"
//           className="rounded-2xl h-full w-auto"
//         />
//       </div>
//       <div className="col-span-3 bg-violet-400 rounded-2xl grid grid-rows-4 gap-4  p-6">
//         <h1 className="text-5xl font-bold grid place-items-center bg-amber-200">
//           Login
//         </h1>
//         <div className="bg-green-200 place-content-center">
//           <FloatingInput type="text" label="Email" />
//         </div>
//         <div className="bg-pink-200 place-content-center">
//           <FloatingInput type="password" label="Password" />
//         </div>
//         <div className="bg-red-200 grid ">
//           <button className="bg-red-600 h-12 w-30  place-self-center ">
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FloatingInput } from "../../components/forms/FloatingInput";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import Modal from "../../components/common/Modal";
import Register from "./Register";

export const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login, setIsLoggedIn, setUser } = useAuth();
  const [globalError, setGlobalError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    const result = login(values.email, values.password);
    if (result.success) {
      setIsLoggedIn(true);
      const user = { email: values.email };
      setUser(user);
      setGlobalError("");
      toast.success("Login successful! Welcome back.");
      onLoginSuccess?.();
      setTimeout(() => navigate("/"), 500);
    } else {
      toast.error(result.message);
      setGlobalError(result.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* This <Form> provides Formik context to FloatingInput */}
        <Form className="w-96 mx-auto p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="font-bold text-3xl text-violet-600 text-center mb-2">
            Login
          </h1>
          <p className="text-center text-gray-500 text-sm mb-6">
            Welcome back to Railway Reservation
          </p>

          {globalError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {globalError}
            </div>
          )}

          <FloatingInput
            name="email"
            type="email"
            label="Email"
            icon={EnvelopeIcon}
            colorScheme="violet"
          />
          <FloatingInput
            name="password"
            type="password"
            label="Password"
            icon={LockClosedIcon}
            colorScheme="violet"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition font-semibold"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              New to the platform?{" "}
              <button
                type="button"
                onClick={() => setShowRegister(true)}
                className="text-violet-600 font-semibold hover:text-violet-700 transition"
              >
                Register here
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-violet-50 rounded-lg border border-violet-200">
            <p className="text-xs text-gray-600 font-semibold mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-gray-600">
              Email: <span className="font-mono">mahesh@example.com</span>
            </p>
            <p className="text-xs text-gray-600">
              Password: <span className="font-mono">Mahesh@1234</span>
            </p>
          </div>
        </Form>
      </Formik>
      
      {/* Register Modal */}
      <Modal open={showRegister} onClose={() => setShowRegister(false)}>
        <Register onRegisterSuccess={() => setShowRegister(false)} />
      </Modal>
    </>
  );
};
