import { apiRequest } from './api.js';

export function listBookmarks(token) {
  return apiRequest('/bookmarks', { token });
}

export function createBookmark(token, issue, status = 'interested') {
  return apiRequest('/bookmarks', { method: 'POST', body: { issue, status }, token });
}

export function updateBookmark(token, id, status) {
  return apiRequest(`/bookmarks/${id}`, { method: 'PATCH', body: { status }, token });
}

export function deleteBookmark(token, id) {
  return apiRequest(`/bookmarks/${id}`, { method: 'DELETE', token });
}
