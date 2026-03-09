import axios from 'axios';

// Using standard axios instance since VITE_API_URL handles endpoint base
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`
});

export const getAssignments = () => api.get('/assignments');
export const getAssignmentById = (id) => api.get(`/assignments/${id}`);
export const startAssignment = (id, userId) => api.post(`/assignments/${id}/start`, { userId });
export const finishAssignment = (id, userId) => api.post(`/assignments/${id}/finish`, { userId });
export const executeQuery = (query, userId) => api.post('/query/execute', { query, userId });
export const getHint = (question, userQuery) => api.post('/hints', { question, userQuery });

export default api;
