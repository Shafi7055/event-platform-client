'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import RequireSession from '@/app/components/RequireSession';
import { useSession } from '@/lib/auth-client';
import { leaveEvent, useDemoData } from '@/lib/demo-store';
import { mockEvents, type Event } from '@/lib/events';

function JoinedEventsContent() {
  const { data: session } = useSession();
  const { createdEvents, joins } = useDemoData();
  const email = session?.user.email ?? '';

  const allEvents: Event[] = [...createdEvents, ...mockEvents];
  const joinedIds = new Set(joins
    .filter((entry) => entry.email.toLowerCase() === email.toLowerCase())
    .map((entry) => entry.eventId));
  const events = allEvents.filter((event) => joinedIds.has(event.id));

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    [events],
  );

  const handleLeave = (event: Event) => {
    try {
      leaveEvent(event.id, email);
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
      <p className="demo-notice">Preview mode: joined events are saved in this browser only until the separate server API is connected.</p>
      {sortedEvents.length ? (
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
