'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { EventCard } from '@/app/components/EventCard';
import type { Event } from '@/lib/events';
import { apiRequest, ApiError } from '@/lib/api-client';

async function loadUpcomingEvents() {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await apiRequest<{ events: Event[] }>('/api/events?limit=6');
    } catch (error) {
      const isTransient = error instanceof ApiError && (error.status === 0 || error.status >= 500);
      if (!isTransient || attempt >= 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
}

export default function HomeUpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;
    loadUpcomingEvents()
      .then(({ events: upcoming }) => {
        if (active) setEvents(upcoming);
      })
      .catch((error: unknown) => {
        if (active) setLoadError(error instanceof Error ? error.message : 'Unable to load events.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <section className="section-wrap events-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A good place to start</span>
          <h2>Find your next <span>feel-good</span></h2>
        </div>
        <Link href="/upcoming-events" className="text-link">See all events <span aria-hidden="true">↗</span></Link>
      </div>
      {loading ? (
        <p className="empty-state" aria-live="polite">Finding upcoming events…</p>
      ) : loadError ? (
        <p className="empty-state" role="alert">{loadError}</p>
      ) : events.length ? (
        <div className="event-grid">
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      ) : (
        <p className="empty-state">No upcoming events yet. Be the neighbor who starts something good.</p>
      )}
    </section>
  );
}
