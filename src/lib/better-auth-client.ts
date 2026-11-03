'use client';

import { createAuthClient } from 'better-auth/react';
import { API_URL } from '@/lib/api-client';

export const betterAuthClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: {
    credentials: 'include',
  },
});
