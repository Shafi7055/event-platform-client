'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import RequireSession from '@/app/components/RequireSession';
import { apiRequest } from '@/lib/api-client';
import type { Event } from '@/lib/events';

function JoinedEventsContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;
    apiRequest<{ events: Event[] }>('/api/users/me/joins')
      .then(({ events: joinedEvents }) => {
        if (active) setEvents(joinedEvents);
      })
      .catch((error: unknown) => {
        if (active) setLoadError(error instanceof Error ? error.message : 'Unable to load joined events.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    [events],
  );

  const handleLeave = async (event: Event) => {
    try {
      await apiRequest<{ joined: boolean }>(`/api/events/${event.id}/join`, { method: 'DELETE' });
      setEvents((current) => current.filter((item) => item.id !== event.id));
      toast.success('Event removed from your joined list.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update your joined list.');
    }
  };

  return (
    <section className="dashboard-page section-wrap">
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">Good things you signed up for</span>
          <h1>Joined <span>events.</span></h1>
          <p>Your next chance to show up, sorted by event date.</p>
        </div>
        <Link href="/upcoming-events" className="button button-primary">Find another event <span aria-hidden="true">↗</span></Link>
      </div>
      {loading ? (
        <div className="empty-state" aria-live="polite"><span className="loading-spinner" /><p>Loading your joined events…</p></div>
      ) : loadError ? (
        <div className="empty-state" role="alert"><h2>Could not load joined events.</h2><p>{loadError}</p></div>
      ) : sortedEvents.length ? (
        <div className="joined-list">
          {sortedEvents.map((event) => (
            <article className="joined-card" key={event.id}>
              <div className="joined-photo"><Image src={event.thumbnail} alt="" fill unoptimized sizes="150px" /></div>
              <div className="joined-info">
                <span className="event-card-date">{new Date(`${event.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} · {event.type}</span>
                <h2>{event.title}</h2>
                <p>{event.location}</p>
                <Link href={`/events/${event.id}`} className="text-link">Event details ↗</Link>
              </div>
              <button type="button" className="danger-link" onClick={() => handleLeave(event)}>Leave event</button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">♡</span>
          <h2>No events on your calendar yet.</h2>
          <p>Find something good happening nearby and save yourself a spot.</p>
          <Link href="/upcoming-events" className="button button-primary">Explore events <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    </section>
  );
}

export default function JoinedEventsPage() {
  return <RequireSession><JoinedEventsContent /></RequireSession>;
}
