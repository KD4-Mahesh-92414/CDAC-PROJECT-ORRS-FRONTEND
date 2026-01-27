import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authService from "../../services/authService";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required("Please confirm your new password"),
});

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmitting(true);
      
      console.log('ChangePassword: Form values received:', values);
      
      // Prepare data for backend API - match UpdatePasswordReqDTO field names
      const passwordData = {
        password: values.currentPassword,        // backend expects 'password' for current password
        newPassword: values.newPassword,         // backend expects 'newPassword'
        newCnfPassword: values.confirmPassword,  // backend expects 'newCnfPassword'
      };

      console.log('ChangePassword: Sending to backend:', {
        password: passwordData.password ? '[HIDDEN]' : 'EMPTY',
        newPassword: passwordData.newPassword ? '[HIDDEN]' : 'EMPTY',
        newCnfPassword: passwordData.newCnfPassword ? '[HIDDEN]' : 'EMPTY',
        passwordLength: passwordData.password?.length,
        newPasswordLength: passwordData.newPassword?.length,
        confirmPasswordLength: passwordData.newCnfPassword?.length
      });

      const response = await authService.changePassword(passwordData);
      
      console.log('ChangePassword: Backend response:', response);
      
      if (response) {
        toast.success('Password changed successfully!');
        resetForm();
        // Redirect to profile page after successful password change
        setTimeout(() => {
          navigate('/account/profile');
        }, 1500);
      }
    } catch (error) {
      console.error('ChangePassword: Error changing password:', error);
      console.error('ChangePassword: Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.message || 'Failed to change password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/account/profile');
  };

  const toggleShow = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Change Password
          </h1>
          <p className="text-lg text-gray-600">
            Secure your account by updating your password regularly
          </p>
        </div>

        {/* Change Password Form */}
        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200 p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                        touched.currentPassword && errors.currentPassword
                          ? "border-red-400"
                          : "border-violet-200"
                      }`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShow("current")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                    >
                      {showPasswords.current ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {touched.currentPassword && errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>

                {/* New Password */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    New Password *
                  </label>
                  <div className="relative mb-4">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                        touched.newPassword && errors.newPassword
                          ? "border-red-400"
                          : "border-violet-200"
                      }`}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShow("new")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                    >
                      {showPasswords.new ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {touched.newPassword && errors.newPassword && (
                    <p className="text-red-500 text-sm mb-4">{errors.newPassword}</p>
                  )}

                  {/* Password Strength Indicator */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 font-semibold">
                      Password Requirements:
                    </p>
                    <div className="space-y-1">
                      {[
                        {
                          label: "At least 8 characters",
                          met: values.newPassword.length >= 8,
                        },
                        {
                          label: "Contains uppercase letter",
                          met: /[A-Z]/.test(values.newPassword),
                        },
                        {
                          label: "Contains lowercase letter",
                          met: /[a-z]/.test(values.newPassword),
                        },
                        {
                          label: "Contains number",
                          met: /[0-9]/.test(values.newPassword),
                        },
                        {
                          label: "Contains special character",
                          met: /[!@#$%^&*]/.test(values.newPassword),
                        },
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span
                            className={`h-4 w-4 rounded-full flex items-center justify-center text-xs ${
                              req.met ? "bg-green-500 text-white" : "bg-gray-300"
                            }`}
                          >
                            {req.met ? "✓" : ""}
                          </span>
                          <span
                            className={`text-xs ${
                              req.met ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="border-t-2 border-violet-100 pt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-red-400"
                          : "border-violet-200"
                      }`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShow("confirm")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                    >
                      {showPasswords.confirm ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                  {values.newPassword &&
                    values.confirmPassword &&
                    values.newPassword === values.confirmPassword &&
                    !errors.confirmPassword && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        ✓ Passwords match
                      </p>
                    )}
                </div>

                {/* Security Info */}
                <div className="border-t-2 border-violet-100 pt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Security Tip:</strong> Never share your password with
                    anyone. We will never ask for your password via email or phone.
                    Always use a strong, unique password.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="border-t-2 border-violet-100 pt-6 flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Changing Password..." : "Change Password"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
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
