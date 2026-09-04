import { apiRequest } from '../httpClient';

function encodeId(id) {
  return encodeURIComponent(String(id));
}

export function uploadDataSource({ projectId, file }) {
  if (!projectId) {
    throw new Error('projectId is required to upload a data source.');
  }
  if (!file) {
    throw new Error('A file is required to upload a data source.');
  }

  const formData = new FormData();
  formData.append('file', file);

  return apiRequest(`/api/v1/projects/${encodeId(projectId)}/data-source`, {
    method: 'POST',
    body: formData,
  });
}

export function getDataSource(projectId) {
  return apiRequest(`/api/v1/projects/${encodeId(projectId)}/data-source`);
}

export function deleteDataSource(projectId) {
  return apiRequest(`/api/v1/projects/${encodeId(projectId)}/data-source`, {
    method: 'DELETE',
  });
}

// Backwards-compatible alias used by earlier StudioPage code paths.
export const createDataSource = uploadDataSource;
