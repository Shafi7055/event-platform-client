import { API_URL } from '@/lib/api-client';
import type { AuthSession } from '@/lib/auth-client';

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') return false;
  const session = value as Partial<AuthSession>;
  return Boolean(
    typeof session.token === 'string' &&
    session.user &&
    typeof session.user.id === 'string' &&
    typeof session.user.name === 'string' &&
    typeof session.user.email === 'string' &&
    typeof session.user.image === 'string',
  );
}

export async function exchangeAuthSession(): Promise<AuthSession> {
  const response = await fetch(`${API_URL}/api/auth/token`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
  });
  const result: unknown = await response.json();

  if (!response.ok) {
    const message =
      result && typeof result === 'object' && 'message' in result &&
      typeof result.message === 'string'
        ? result.message
        : `Sign-in could not be completed (HTTP ${response.status}).`;
    throw new Error(message);
  }
  if (!isAuthSession(result)) {
    throw new Error('The server returned an invalid sign-in session.');
  }
  return result;
}
