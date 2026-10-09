import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getOverview = () => api.get('/overview');
export const getMonthlyEmissions = () => api.get('/monthlyEmissions');
export const getEmissionsByCategory = () => api.get('/emissionsByCategory');
export const getDepartmentEmissions = () => api.get('/departmentEmissions');
export const getReductionGoals = () => api.get('/reductionGoals');
export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities', activity);
export const deleteActivity = (id) => api.delete(`/activities/${id}`);
export const getTips = () => api.get('/tips');

export default api;
