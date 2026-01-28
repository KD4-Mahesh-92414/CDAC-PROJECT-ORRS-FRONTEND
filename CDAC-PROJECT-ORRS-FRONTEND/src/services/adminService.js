import api from './api';

// Station Management APIs
export const stationService = {
  getAllStations: () => api.get('/admin/stations'),
  addStation: (stationData) => api.post('/admin/stations', stationData),
  updateStation: (stationId, stationData) => api.put(`/admin/stations/${stationId}`, stationData),
  updateStationStatus: (stationId, statusData) => api.patch(`/admin/stations/${stationId}/status`, statusData),
  deleteStation: (stationId) => api.delete(`/admin/stations/${stationId}`)
};

// Train Management APIs
export const trainService = {
  getAllTrains: () => api.get('/admin/trains'),
  addTrain: (trainData) => api.post('/admin/trains', trainData),
  updateTrain: (trainId, trainData) => api.put(`/admin/trains/${trainId}`, trainData),
  updateTrainStatus: (trainId, statusData) => api.patch(`/admin/trains/${trainId}/status`, statusData),
  deleteTrain: (trainId) => api.delete(`/admin/trains/${trainId}`)
};

// User Management APIs
export const userService = {
  getAllUsers: () => api.get('/admin/users'),
  getUserById: (userId) => api.get(`/admin/users/${userId}`),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (userId, userData) => api.put(`/admin/users/${userId}`, userData),
  updateUserStatus: (userId, statusData) => api.patch(`/admin/users/${userId}/status`, statusData),
  suspendUser: (userId) => api.patch(`/admin/users/${userId}/suspend`),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`)
};

// Train Fare Management APIs
export const fareService = {
  getAllFares: () => api.get('/admin/fares'),
  addFare: (fareData) => api.post('/admin/fares', fareData),
  updateFare: (fareId, fareData) => api.put(`/admin/fares/${fareId}`, fareData),
  updateFareStatus: (fareId, statusData) => api.patch(`/admin/fares/${fareId}/status`, statusData),
  deleteFare: (fareId) => api.delete(`/admin/fares/${fareId}`)
};

// Coach Type Management APIs
export const coachTypeService = {
  getAllCoachTypes: () => api.get('/admin/coach-types'),
  addCoachType: (coachTypeData) => api.post('/admin/coach-types', coachTypeData),
  updateCoachType: (coachTypeId, coachTypeData) => api.put(`/admin/coach-types/${coachTypeId}`, coachTypeData),
  deleteCoachType: (coachTypeId) => api.delete(`/admin/coach-types/${coachTypeId}`)
};

// Seat Layout Management APIs
export const seatLayoutService = {
  getAllSeatLayouts: () => api.get('/admin/seat-layouts'),
  addSeatLayout: (seatLayoutData) => api.post('/admin/seat-layouts', seatLayoutData),
  updateSeatLayout: (seatLayoutId, seatLayoutData) => api.put(`/admin/seat-layouts/${seatLayoutId}`, seatLayoutData),
  deleteSeatLayout: (seatLayoutId) => api.delete(`/admin/seat-layouts/${seatLayoutId}`)
};

// Train Route Management APIs
export const trainRouteService = {
  getAllTrainRoutes: () => api.get('/admin/train-routes'),
  addTrainRoute: (trainRouteData) => api.post('/admin/train-routes', trainRouteData),
  updateTrainRoute: (trainRouteId, trainRouteData) => api.put(`/admin/train-routes/${trainRouteId}`, trainRouteData),
  deleteTrainRoute: (trainRouteId) => api.delete(`/admin/train-routes/${trainRouteId}`)
};

// Dashboard APIs (if available)
export const dashboardService = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getRecentActivity: () => api.get('/admin/dashboard/recent-activity')
};

// Combined admin service
const adminService = {
  stations: stationService,
  trains: trainService,
  users: userService,
  fares: fareService,
  coachTypes: coachTypeService,
  seatLayouts: seatLayoutService,
  trainRoutes: trainRouteService,
  dashboard: dashboardService
};

export default adminService;