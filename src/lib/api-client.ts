import { getAccessToken } from '@/lib/auth-client';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const token = getAccessToken();
  if (token) headers.set('authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(path, {
      ...options,
      headers,
      cache: options.cache ?? 'no-store',
    });
  } catch (error) {
    console.error(`API request failed for ${path}`, error);
    throw new ApiError(0, 'Unable to reach the server. Check your connection and try again.');
  }

  if (!response.ok) {
    let message = `Request failed with HTTP ${response.status}.`;
    try {
      const result = await response.json() as { message?: string };
      if (result.message) message = result.message;
    } catch (error) {
      console.error(`Unable to read the API error response for ${path}`, error);
    }
    if (response.status === 401 && token && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('goodneighbor:session-expired'));
    }
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
