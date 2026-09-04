import { apiRequest } from '../httpClient';

function encodeId(id) {
  return encodeURIComponent(String(id));
}

export function getProject(projectId) {
  return apiRequest(`/api/v1/projects/${encodeId(projectId)}`);
}

export function createProject({ folderId = null, name, description }) {
  return apiRequest('/api/v1/projects', {
    method: 'POST',
    body: { folderId, name, description },
  });
}

export function updateProject(projectId, { name, description }) {
  return apiRequest(`/api/v1/projects/${encodeId(projectId)}`, {
    method: 'PATCH',
    body: { name, description },
  });
}

export function moveProject(projectId, targetFolderId) {
  return apiRequest(`/api/v1/projects/${encodeId(projectId)}/move`, {
    method: 'PATCH',
    body: { targetFolderId },
  });
}

export function deleteProject(projectId) {
  return apiRequest(`/api/v1/projects/${encodeId(projectId)}`, {
    method: 'DELETE',
  });
}
