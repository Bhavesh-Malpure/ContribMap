import { apiRequest } from './api.js';

export function searchIssues(token, params) {
  const query = new URLSearchParams();
  if (params.skills?.length) query.set('skills', params.skills.join(','));
  if (params.language) query.set('language', params.language);
  if (params.beginnerOnly) query.set('beginnerOnly', 'true');
  if (params.sort) query.set('sort', params.sort);
  if (params.page) query.set('page', String(params.page));
  return apiRequest(`/issues?${query.toString()}`, { token });
}

export function getIssue(token, id) {
  return apiRequest(`/issues/${id}`, { token });
}

export function getGitHubIssue(token, owner, repo, number) {
  return apiRequest(`/issues/github/${owner}/${repo}/${number}`, { token });
}
