import { apiRequest, setAccessToken, clearAccessToken } from '../httpClient';

export function register({ email, password, nickname }) {
  return apiRequest('/api/v1/auth/register', {
    method: 'POST',
    auth: false,
    body: { email, password, nickname },
  });
}

export function check({ type, value }) {
  return apiRequest('/api/v1/auth/check', {
    auth: false,
    query: { type, value },
  });
}

export async function login({ email, password }) {
  const data = await apiRequest('/api/v1/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  });

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
}

export async function logout() {
  try {
    await apiRequest('/api/v1/auth/logout', { method: 'POST' });
  } finally {
    clearAccessToken();
  }
}

export async function reissue() {
  const data = await apiRequest('/api/v1/auth/reissue', {
    method: 'POST',
    auth: false,
  });

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
}
