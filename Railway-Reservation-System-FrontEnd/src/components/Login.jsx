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
import { FloatingInput } from "./FloatingInput";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[^a-zA-Z0-9]/, "Password must contain at least one symbol")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {/* This <Form> provides Formik context to FloatingInput */}
      <Form className="w-96 mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="font-bold text-3xl text-violet-500 text-center mb-4">
          Login
        </h1>
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
          className="w-full mt-4 bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition"
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};
