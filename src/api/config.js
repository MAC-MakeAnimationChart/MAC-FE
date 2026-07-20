const DEFAULT_BASE_URL = 'http://localhost:8080';
const configuredBaseUrl = import.meta.env.BASE_SERVER_URL || import.meta.env.VITE_BASE_SERVER_URL;

function normalizeBaseUrl(value) {
  const rawValue = String(value || DEFAULT_BASE_URL).trim();

  try {
    const url = new URL(rawValue);
    const isAllowedProtocol = url.protocol === 'http:' || url.protocol === 'https:';

    if (!isAllowedProtocol) {
      throw new Error('Only http and https API URLs are allowed.');
    }

    url.pathname = url.pathname.replace(/\/+$/, '');
    return url.toString().replace(/\/$/, '');
  } catch {
    console.warn('Invalid BASE_SERVER_URL. Falling back to local API server.');
    return DEFAULT_BASE_URL;
  }
}

export const API_BASE_URL = normalizeBaseUrl(configuredBaseUrl);
