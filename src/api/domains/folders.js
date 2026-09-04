import { apiRequest } from '../httpClient';

function encodeId(id) {
  return encodeURIComponent(String(id));
}

export function getFolderTree() {
  return apiRequest('/api/v1/folders/tree');
}

export function createFolder({ parentId = null, name }) {
  return apiRequest('/api/v1/folders', {
    method: 'POST',
    body: { parentId, name },
  });
}

export function renameFolder(folderId, name) {
  return apiRequest(`/api/v1/folders/${encodeId(folderId)}/name`, {
    method: 'PATCH',
    body: { name },
  });
}

export function moveFolder(folderId, targetParentId) {
  return apiRequest(`/api/v1/folders/${encodeId(folderId)}/move`, {
    method: 'PATCH',
    body: { targetParentId },
  });
}

export function deleteFolder(folderId) {
  return apiRequest(`/api/v1/folders/${encodeId(folderId)}`, {
    method: 'DELETE',
  });
}
