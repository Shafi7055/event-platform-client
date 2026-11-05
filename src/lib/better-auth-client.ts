'use client';

import { createAuthClient } from 'better-auth/react';

export const betterAuthClient = createAuthClient({
  baseURL: typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin,
  fetchOptions: {
    credentials: 'include',
  },
});
