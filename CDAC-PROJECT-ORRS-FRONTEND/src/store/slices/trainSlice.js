import { createSlice } from '@reduxjs/toolkit'

const trainSlice = createSlice({
  name: 'trains',
  initialState: {
    searchResults: [],
    searchParams: {
      from: '',
      to: '',
      date: '',
    },
    selectedTrain: null,
    stations: [],
    isLoading: false,
    error: null,
    // Cache for frequently accessed data
    stationsCache: [],
    lastStationsFetch: null,
  },
  reducers: {
    searchStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    searchSuccess: (state, action) => {
      state.searchResults = action.payload.results
      state.searchParams = action.payload.params
      state.isLoading = false
      state.error = null
    },
    searchFailure: (state, action) => {
      state.searchResults = []
      state.isLoading = false
      state.error = action.payload
    },
    selectTrain: (state, action) => {
      state.selectedTrain = action.payload
    },
    clearSelectedTrain: (state) => {
      state.selectedTrain = null
    },
    setStations: (state, action) => {
      state.stations = action.payload
      // Cache stations data
      state.stationsCache = action.payload
      state.lastStationsFetch = Date.now()
    },
    clearError: (state) => {
      state.error = null
    },
    clearSearchResults: (state) => {
      state.searchResults = []
      state.searchParams = {
        from: '',
        to: '',
        date: '',
      }
    },
  },
})

export const {
  searchStart,
  searchSuccess,
  searchFailure,
  selectTrain,
  clearSelectedTrain,
  setStations,
  clearError,
  clearSearchResults,
} = trainSlice.actions

export default trainSlice.reducer