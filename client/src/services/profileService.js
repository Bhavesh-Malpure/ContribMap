import { apiRequest } from './api.js';

export function getProfile(token) {
  return apiRequest('/profile', { token });
}

export function updateProfile(token, payload) {
  return apiRequest('/profile', { method: 'PUT', body: payload, token });
}

export function getSkills(token) {
  return apiRequest('/skills', { token });
}
