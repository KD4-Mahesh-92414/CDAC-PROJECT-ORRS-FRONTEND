import api from './api'

/**
 * Train Service
 * Handles all train-related API calls
 */
const trainService = {
  /**
   * Search trains
   * @param {Object} searchParams - { from, to, date }
   * @returns {Promise} Search results
   */
  searchTrains: async (searchParams) => {
    try {
      const response = await api.post('/schedule/search', {
        fromStation: searchParams.from,
        toStation: searchParams.to,
        journeyDate: searchParams.date,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search trains' }
    }
  },

  /**
   * Get seat matrix for a train
   * @param {Object} seatParams - Train and date information
   * @returns {Promise} Seat availability data
   */
  getSeatMatrix: async (seatParams) => {
    try {
      const response = await api.post('/api/seats/matrix', seatParams)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get seat matrix' }
    }
  },

  /**
   * Get train status
   * @param {string} trainNumber - Train number
   * @returns {Promise} Train status information
   */
  getTrainStatus: async (trainNumber) => {
    try {
      const response = await api.get(`/api/train-status/${trainNumber}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get train status' }
    }
  },

  /**
   * Get all stations (for autocomplete)
   * @returns {Promise} List of stations
   */
  getStations: async () => {
    try {
      const response = await api.get('/api/stations')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stations' }
    }
  },
}

export default trainService