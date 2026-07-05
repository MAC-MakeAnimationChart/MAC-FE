import { apiRequest } from '../httpClient';

export function createDataSource({ projectId, sourceType = 'UPLOAD', file }) {
  if (!file) {
    throw new Error('A file is required to create a data source.');
  }

  const formData = new FormData();
  formData.append('data', JSON.stringify({ projectId, sourceType }));
  formData.append('file', file);

  return apiRequest('/api/v1/data-sources', {
    method: 'POST',
    body: formData,
  });
}
