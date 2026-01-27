import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    // Search data
    searchData: {
      from: '',
      to: '',
      date: '',
      passengers: 1
    },
    // Train selection
    selectedTrain: null,
    // Booking flow
    currentBooking: null,
    selectedSeats: [],
    passengers: [],
    paymentDetails: null,
    fareData: null,
    bookingHistory: [],
    isLoading: false,
    error: null,
    // Booking flow state
    step: 1, // 1: Search, 2: Select Train, 3: Passenger Details, 4: Payment, 5: Confirmation
  },
  reducers: {
    // Search actions
    setSearchData: (state, action) => {
      state.searchData = action.payload
    },
    clearSearchData: (state) => {
      state.searchData = {
        from: '',
        to: '',
        date: '',
        passengers: 1
      }
    },
    // Train selection actions
    setSelectedTrain: (state, action) => {
      state.selectedTrain = action.payload
    },
    clearSelectedTrain: (state) => {
      state.selectedTrain = null
    },
    // Fare data actions
    setFareData: (state, action) => {
      state.fareData = action.payload
    },
    // Booking actions
    bookingStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    bookingSuccess: (state, action) => {
      state.currentBooking = action.payload
      state.isLoading = false
      state.error = null
      state.step = 5 // Move to confirmation step
    },
    bookingFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload
    },
    setPassengers: (state, action) => {
      state.passengers = action.payload
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload
    },
    setBookingStep: (state, action) => {
      state.step = action.payload
    },
    nextStep: (state) => {
      if (state.step < 5) {
        state.step += 1
      }
    },
    previousStep: (state) => {
      if (state.step > 1) {
        state.step -= 1
      }
    },
    setBookingHistory: (state, action) => {
      state.bookingHistory = action.payload
    },
    resetBooking: (state) => {
      state.currentBooking = null
      state.selectedSeats = []
      state.passengers = []
      state.paymentDetails = null
      state.fareData = null
      state.selectedTrain = null
      state.step = 1
      state.error = null
    },
    clearBooking: (state) => {
      state.currentBooking = null
      state.selectedSeats = []
      state.passengers = []
      state.paymentDetails = null
      state.step = 1
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  // Search actions
  setSearchData,
  clearSearchData,
  // Train selection actions
  setSelectedTrain,
  clearSelectedTrain,
  // Fare data actions
  setFareData,
  // Booking actions
  bookingStart,
  bookingSuccess,
  bookingFailure,
  setSelectedSeats,
  setPassengers,
  setPaymentDetails,
  setBookingStep,
  nextStep,
  previousStep,
  setBookingHistory,
  resetBooking,
  clearBooking,
  clearError,
} = bookingSlice.actions

export default bookingSlice.reducer