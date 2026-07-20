import { apiRequest } from '../httpClient';

export function getLogs(params = {}) {
  return apiRequest('/api/v1/admin/logs', { query: params });
}

export function getLog(logId) {
  return apiRequest(`/api/v1/admin/logs/${encodeURIComponent(String(logId))}`);
}

export function getSlowQueries(params = {}) {
  return apiRequest('/api/v1/admin/logs/slow-queries', { query: params });
}

export function updateNotificationSettings(settings) {
  return apiRequest('/api/v1/admin/notifications/settings', {
    method: 'PUT',
    body: settings,
  });
}

export function sendTestNotification(channel) {
  return apiRequest('/api/v1/admin/notifications/test', {
    method: 'POST',
    body: { channel },
  });
}
