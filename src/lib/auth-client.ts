'use client';

import { useEffect, useSyncExternalStore } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

interface SessionSnapshot {
  data: AuthSession | null;
  isPending: boolean;
}

const SESSION_KEY = 'goodneighbor:auth-session';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const SERVER_SNAPSHOT: SessionSnapshot = { data: null, isPending: true };
let snapshot = SERVER_SNAPSHOT;
let restorePromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit(next: SessionSnapshot) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') return false;
  const session = value as Partial<AuthSession>;
  return Boolean(
    typeof session.token === 'string' &&
    session.user &&
    typeof session.user.id === 'string' &&
    typeof session.user.name === 'string' &&
    typeof session.user.email === 'string',
  );
}

export function getAccessToken() {
  return snapshot.data?.token ?? null;
}

export function setAuthSession(session: AuthSession) {
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Unable to persist the authentication session', error);
    throw new Error('Your browser could not save the sign-in session. Check browser storage settings and try again.');
  }
  emit({ data: session, isPending: false });
}

export function clearAuthSession() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Unable to clear the authentication session', error);
    throw new Error('Unable to clear the sign-in session. Try again or close this browser tab.');
  }
  emit({ data: null, isPending: false });
}

async function restoreSession() {
  if (restorePromise) return restorePromise;

  restorePromise = (async () => {
    let stored: unknown;
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      stored = raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error('Unable to read the saved authentication session', error);
      clearAuthSession();
      return;
    }

    if (!isAuthSession(stored)) {
      emit({ data: null, isPending: false });
      return;
    }

    emit({ data: stored, isPending: true });
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${stored.token}` },
      });
      if (response.status === 401) {
        clearAuthSession();
        return;
      }
      if (!response.ok) {
        throw new Error(`Account check failed with HTTP ${response.status}.`);
      }

      const result = await response.json() as { user?: AuthUser };
      if (!result.user) throw new Error('The account response did not include a user.');
      setAuthSession({ token: stored.token, user: result.user });
    } catch (error) {
      console.error('Unable to verify the saved authentication session', error);
      emit({ data: stored, isPending: false });
    }
  })().finally(() => {
    restorePromise = null;
  });

  return restorePromise;
}

export function useSession() {
  const current = useSyncExternalStore(subscribe, () => snapshot, () => SERVER_SNAPSHOT);

  useEffect(() => {
    void restoreSession();
    const handleExpiredSession = () => {
      try {
        clearAuthSession();
      } catch (error) {
        console.error('Unable to clear an expired authentication session', error);
      }
    };
    window.addEventListener('goodneighbor:session-expired', handleExpiredSession);
    return () => window.removeEventListener('goodneighbor:session-expired', handleExpiredSession);
  }, []);

  return current;
}

export async function signOut() {
  clearAuthSession();
}
