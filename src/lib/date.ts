'use client';

import { useSyncExternalStore } from 'react';

function getLocalDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function subscribeToDateChange(callback: () => void) {
  window.addEventListener('focus', callback);
  document.addEventListener('visibilitychange', callback);
  return () => {
    window.removeEventListener('focus', callback);
    document.removeEventListener('visibilitychange', callback);
  };
}

export function useToday() {
  return useSyncExternalStore(subscribeToDateChange, getLocalDate, () => '1970-01-01');
}

export function addDaysToDate(date: string, days: number) {
  const value = new Date(`${date}T12:00:00`);
  value.setDate(value.getDate() + days);
  const localDate = new Date(value.getTime() - value.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}
