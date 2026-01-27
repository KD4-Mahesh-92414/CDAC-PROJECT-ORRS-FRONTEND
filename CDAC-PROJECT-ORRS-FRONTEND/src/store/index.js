import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import trainSlice from './slices/trainSlice'
import bookingSlice from './slices/bookingSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    trains: trainSlice,
    booking: bookingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export default store