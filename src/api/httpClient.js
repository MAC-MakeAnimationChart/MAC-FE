import { API_BASE_URL } from './config';

const REQUEST_TIMEOUT_MS = 15000;

export class ApiError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function joinUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

function buildQuery(params) {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    query.set(key, String(value));
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    query,
    body,
    headers,
    unwrap = true,
    signal,
    ...rest
  } = options;

  const isFormData = body instanceof FormData;
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !isFormData && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  requestHeaders.set('Accept', 'application/json');

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  let response;

  try {
    response = await fetch(`${joinUrl(path)}${buildQuery(query)}`, {
      method,
      headers: requestHeaders,
      body: body === undefined || isFormData ? body : JSON.stringify(body),
      credentials: 'omit',
      mode: 'cors',
      signal: controller.signal,
      ...rest,
    });
  } catch (error) {
    if (controller.signal.aborted) {
      throw new ApiError('API request timed out.', { status: 408 });
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(payload?.message || 'API request failed.', {
      status: response.status,
      code: payload?.code,
      details: payload,
    });
  }

  return unwrap ? payload?.data : payload;
}
