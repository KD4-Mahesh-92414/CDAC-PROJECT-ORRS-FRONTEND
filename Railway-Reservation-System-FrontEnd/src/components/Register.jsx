import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FloatingInput } from "./FloatingInput";

const Register = () => {
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
      onSubmit={(value) => {
        console.log(value);
      }}
    >
      <Form className="w-96 p-6 mt-10 bg-white rounded-2xl shadow-2xl">
        <h1 className="font-bold text-3xl text-violet-500 text-center mb-4">
          Register
        </h1>
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
          className="w-full mt-4 bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default Register;
