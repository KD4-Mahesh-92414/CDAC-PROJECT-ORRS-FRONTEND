import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      // Store token in localStorage
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    clearError: (state) => {
      state.error = null
    },
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      console.log('Auth initialization:', {
        hasToken: !!token,
        hasUser: !!user,
        tokenPreview: token ? `${token.substring(0, 30)}...` : 'No token'
      });
      
      if (token && user) {
        console.log('Auth initialization: Token and user found, authenticating user');
        state.token = token
        state.user = JSON.parse(user)
        state.isAuthenticated = true
      } else {
        console.log('Auth initialization: No token or user found');
        state.token = null
        state.user = null
        state.isAuthenticated = false
      }
    },
    // Update user data (for profile updates)
    setUser: (state, action) => {
      state.user = action.payload
      // Update localStorage with new user data
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
  },
})

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError, 
  initializeAuth,
  setUser
} = authSlice.actions

export default authSlice.reducer