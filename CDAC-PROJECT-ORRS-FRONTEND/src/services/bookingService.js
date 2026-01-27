import api from './api'

/**
 * Booking Service
 * Handles all booking-related API calls
 */
const bookingService = {
  /**
   * Reserve seats
   * @param {Object} reservationData - Seat reservation details
   * @returns {Promise} Reservation response
   */
  reserveSeats: async (reservationData) => {
    try {
      const response = await api.post('/api/booking/reserve-seats', reservationData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reserve seats' }
    }
  },

  /**
   * Confirm booking
   * @param {Object} bookingData - Complete booking details
   * @returns {Promise} Booking confirmation
   */
  confirmBooking: async (bookingData) => {
    try {
      const response = await api.post('/api/booking/confirm', bookingData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to confirm booking' }
    }
  },

  /**
   * Check reservation status
   * @param {number} reservationId - Reservation ID
   * @returns {Promise} Reservation status
   */
  checkReservationStatus: async (reservationId) => {
    try {
      const response = await api.get(`/api/booking/reservation/${reservationId}/status`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to check reservation status' }
    }
  },

  /**
   * Get user booking history
   * @returns {Promise} List of user bookings
   */
  getBookingHistory: async () => {
    try {
      const response = await api.get('/users/bookings/history')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch booking history' }
    }
  },

  /**
   * Cancel booking
   * @param {Object} cancelData - Cancellation details
   * @returns {Promise} Cancellation response
   */
  cancelBooking: async (cancelData) => {
    try {
      const response = await api.post('/users/bookings/cancel', cancelData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel booking' }
    }
  },

  /**
   * Check PNR status
   * @param {string} pnrNumber - PNR number
   * @returns {Promise} PNR status details
   */
  checkPNRStatus: async (pnrNumber) => {
    try {
      const response = await api.post('/pnr/status', { pnrNumber })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to check PNR status' }
    }
  },

  /**
   * Get user booking statistics
   * @returns {Promise} Booking statistics
   */
  getBookingStats: async () => {
    try {
      const response = await api.get('/users/bookings/stats')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch booking statistics' }
    }
  },
}

export default bookingService