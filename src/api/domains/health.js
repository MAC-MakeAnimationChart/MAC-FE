import { apiRequest } from '../httpClient';

export function getHealth() {
  return apiRequest('/api/v1/health', { unwrap: false });
}
