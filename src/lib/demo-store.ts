import { useMemo, useSyncExternalStore } from 'react';
import type { Event } from '@/lib/events';

export interface CreatedEvent extends Event {
  createdBy: string;
  createdAt: string;
}

interface JoinedEvent {
  eventId: string;
  email: string;
  joinedAt: string;
}

const EVENTS_KEY = 'goodneighbor:created-events';
const JOINED_KEY = 'goodneighbor:joined-events';
const PROFILE_KEY = 'goodneighbor:profile';
const STORE_EVENT = 'goodneighbor:storage-updated';

const EMPTY_SNAPSHOT = JSON.stringify({ events: '[]', joins: '[]', profiles: '{}' });

function getSnapshot() {
  if (typeof window === 'undefined') return EMPTY_SNAPSHOT;
  return JSON.stringify({
    events: window.localStorage.getItem(EVENTS_KEY) ?? '[]',
    joins: window.localStorage.getItem(JOINED_KEY) ?? '[]',
    profiles: window.localStorage.getItem(PROFILE_KEY) ?? '{}',
  });
}

function subscribe(callback: () => void) {
  window.addEventListener(STORE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(STORE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function useDemoData() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_SNAPSHOT);

  return useMemo(() => {
    try {
      const storage = JSON.parse(snapshot) as { events: string; joins: string; profiles: string };
      return {
        createdEvents: JSON.parse(storage.events) as CreatedEvent[],
        joins: JSON.parse(storage.joins) as JoinedEvent[],
        profiles: JSON.parse(storage.profiles) as Record<string, DemoProfile>,
      };
    } catch (error) {
      console.error('Unable to parse the local demo data snapshot', error);
      return { createdEvents: [], joins: [], profiles: {} };
    }
  }, [snapshot]);
}

function notifyStoreUpdate() {
  window.dispatchEvent(new window.Event(STORE_EVENT));
}

function readList<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return [];
    const value: unknown = JSON.parse(stored);
    return Array.isArray(value) ? (value as T[]) : [];
  } catch (error) {
    console.error(`Unable to read local demo data for "${key}"`, error);
    return [];
  }
}

function writeList<T>(key: string, value: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notifyStoreUpdate();
  } catch (error) {
    console.error(`Unable to save local demo data for "${key}"`, error);
    throw new Error('Your browser could not save this preview data. Check available storage and try again.');
  }
}

export function getCreatedEvents() {
  return readList<CreatedEvent>(EVENTS_KEY);
}

export function saveCreatedEvent(event: CreatedEvent) {
  writeList(EVENTS_KEY, [event, ...getCreatedEvents()]);
}

export function updateCreatedEvent(event: CreatedEvent) {
  writeList(EVENTS_KEY, getCreatedEvents().map((saved) => saved.id === event.id ? event : saved));
}

export function deleteCreatedEvent(id: string) {
  writeList(EVENTS_KEY, getCreatedEvents().filter((event) => event.id !== id));
  writeList(JOINED_KEY, readList<JoinedEvent>(JOINED_KEY).filter((entry) => entry.eventId !== id));
}

export function getJoinedEventIds(email: string) {
  return readList<JoinedEvent>(JOINED_KEY)
    .filter((entry) => entry.email.toLowerCase() === email.toLowerCase())
    .map((entry) => entry.eventId);
}

export function joinEvent(eventId: string, email: string) {
  const joins = readList<JoinedEvent>(JOINED_KEY);
  const alreadyJoined = joins.some((entry) =>
    entry.eventId === eventId && entry.email.toLowerCase() === email.toLowerCase(),
  );
  if (!alreadyJoined) {
    writeList(JOINED_KEY, [...joins, { eventId, email, joinedAt: new Date().toISOString() }]);
  }
  return alreadyJoined;
}

export function leaveEvent(eventId: string, email: string) {
  writeList(
    JOINED_KEY,
    readList<JoinedEvent>(JOINED_KEY).filter((entry) =>
      entry.eventId !== eventId || entry.email.toLowerCase() !== email.toLowerCase(),
    ),
  );
}

export interface DemoProfile {
  name: string;
  image: string;
}

export function getDemoProfile(email: string, fallbackName: string): DemoProfile {
  if (typeof window === 'undefined') return { name: fallbackName, image: '' };
  try {
    const profiles = JSON.parse(window.localStorage.getItem(PROFILE_KEY) ?? '{}') as Record<string, DemoProfile>;
    return profiles[email.toLowerCase()] ?? { name: fallbackName, image: '' };
  } catch (error) {
    console.error('Unable to read the local demo profile', error);
    return { name: fallbackName, image: '' };
  }
}

export function saveDemoProfile(email: string, profile: DemoProfile) {
  try {
    const profiles = JSON.parse(window.localStorage.getItem(PROFILE_KEY) ?? '{}') as Record<string, DemoProfile>;
    profiles[email.toLowerCase()] = profile;
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
    notifyStoreUpdate();
  } catch (error) {
    console.error('Unable to save the local demo profile', error);
    throw new Error('Your browser could not save your profile preview. Check available storage and try again.');
  }
}
