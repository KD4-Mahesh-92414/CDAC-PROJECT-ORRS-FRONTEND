import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../common/Modal'
import { Login } from '../../pages/auth/Login'

/**
 * ProtectedRoute Component
 * Responsibility: Guard routes that require authentication
 * Redirects unauthorized users to login modal with return path
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth)
  const location = useLocation()
  const [showLogin, setShowLogin] = useState(!isAuthenticated)

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  // If not authenticated, show login modal
  if (!isAuthenticated) {
    const handleLoginSuccess = () => {
      setShowLogin(false)
      // The component will re-render and show children after successful login
    }

    return (
      <>
        {/* Show a placeholder or redirect message */}
        <div className="flex items-center justify-center min-h-screen bg-violet-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to access this page
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition"
            >
              Login
            </button>
          </div>
        </div>

        {/* Login Modal */}
        <Modal open={showLogin} onClose={() => setShowLogin(false)}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Modal>
      </>
    )
  }

  // If authenticated, render the protected component
  return children
}