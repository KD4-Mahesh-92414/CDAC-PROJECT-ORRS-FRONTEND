import api from './api'

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
const authService = {
  /**
   * User login
   * @param {Object} credentials - { email, password }
   * @returns {Promise} API response with JWT token
   */
  login: async (credentials) => {
    try {
      console.log('AuthService: Attempting login for:', credentials.email);
      const response = await api.post('/users/login', credentials)
      console.log('AuthService: Login response:', response.data);
      return response.data
    } catch (error) {
      console.error('AuthService: Login error:', error);
      console.error('AuthService: Error response:', error.response?.data);
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  /**
   * User registration
   * @param {Object} userData - { fullName, email, password, cnfPassword, mobile }
   * @returns {Promise} API response
   */
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  /**
   * Get current user profile
   * @returns {Promise} User profile data with fullName, email, mobile, gender, dob, address, aadharNo, prefClass
   */
  getProfile: async () => {
    try {
      console.log('AuthService: Attempting to fetch user profile');
      const response = await api.get('/users/me')
      console.log('AuthService: Profile response:', response.data);
      return response.data
    } catch (error) {
      console.error('AuthService: Profile fetch error:', error);
      console.error('AuthService: Error response:', error.response?.data);
      throw error.response?.data || { message: 'Failed to fetch profile' }
    }
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise} Updated user profile
   */
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/update/me', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' }
    }
  },

  /**
   * Change user password
   * @param {Object} passwordData - { oldPassword, newPassword, newCnfPassword }
   * @returns {Promise} API response
   */
  changePassword: async (passwordData) => {
    try {
      const response = await api.patch('/users/update/password', passwordData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' }
    }
  },

  /**
   * Delete user account
   * @returns {Promise} API response
   */
  deleteAccount: async () => {
    try {
      const response = await api.delete('/users/me')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete account' }
    }
  },
}

export default authService