'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import EventEditor, { type EventFormValues } from '@/app/components/EventEditor';
import RequireSession from '@/app/components/RequireSession';
import { apiRequest } from '@/lib/api-client';
import type { Event } from '@/lib/events';

function ManageEventsContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    apiRequest<{ events: Event[] }>('/api/users/me/events')
      .then(({ events: ownedEvents }) => {
        if (active) setEvents(ownedEvents);
      })
      .catch((error: unknown) => {
        if (active) setLoadError(error instanceof Error ? error.message : 'Unable to load your events.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const sortedEvents = useMemo(() => [...events].sort((a, b) => a.date.localeCompare(b.date)), [events]);

  const handleUpdate = async (values: EventFormValues, event: Event) => {
    try {
      const { event: updatedEvent } = await apiRequest<{ event: Event }>(`/api/events/${event.id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
      });
      setEvents((current) => current.map((item) => item.id === event.id ? updatedEvent : item));
      setEditingId(null);
      toast.success('Event updated.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update the event.');
    }
  };

  const handleDelete = async (event: Event) => {
    try {
      await apiRequest<{ message: string }>(`/api/events/${event.id}`, { method: 'DELETE' });
      setEvents((current) => current.filter((item) => item.id !== event.id));
      setDeleteId(null);
      toast.success('Event removed.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to remove the event.');
    }
  };

  return (
    <section className="dashboard-page section-wrap">
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">Your events, your impact</span>
          <h1>Manage <span>events.</span></h1>
          <p>Keep your event details up to date for the neighbors who want to help.</p>
        </div>
        <Link href="/create-event" className="button button-primary">Create an event <span aria-hidden="true">↗</span></Link>
      </div>
      {loading ? (
        <div className="empty-state" aria-live="polite"><span className="loading-spinner" /><p>Loading your events…</p></div>
      ) : loadError ? (
        <div className="empty-state" role="alert"><h2>Could not load your events.</h2><p>{loadError}</p></div>
      ) : sortedEvents.length ? (
        <div className="manage-list">
          {sortedEvents.map((event) => (
            <article className="manage-card" key={event.id}>
              <div className="manage-card-main">
                <div className="manage-photo">
                  <Image src={event.thumbnail} alt="" fill unoptimized sizes="160px" />
                </div>
                <div className="manage-card-info">
                  <span className="event-card-date">{new Date(`${event.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} · {event.type}</span>
                  <h2>{event.title}</h2>
                  <p>{event.location}</p>
                  <Link href={`/events/${event.id}`} className="text-link">View event ↗</Link>
                </div>
                <div className="manage-card-actions">
                  <button type="button" className="button button-secondary" onClick={() => { setEditingId(editingId === event.id ? null : event.id); setDeleteId(null); }}>
                    {editingId === event.id ? 'Close editor' : 'Edit'}
                  </button>
                  <button type="button" className="danger-link" onClick={() => { setDeleteId(event.id); setEditingId(null); }}>Delete</button>
                </div>
              </div>
              {editingId === event.id && (
                <div className="manage-editor">
                  <EventEditor initialEvent={event} submitLabel="Save event" onSubmit={(values) => handleUpdate(values, event)} onCancel={() => setEditingId(null)} />
                </div>
              )}
              {deleteId === event.id && (
                <div className="delete-confirmation" role="group" aria-label={`Confirm deleting ${event.title}`}>
                  <p><strong>Remove this event?</strong><span>This also removes its join records.</span></p>
                  <button type="button" className="button button-secondary" onClick={() => setDeleteId(null)}>Keep event</button>
                  <button type="button" className="button button-danger" onClick={() => handleDelete(event)}>Remove event</button>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">✳</span>
          <h2>Your first event starts here.</h2>
          <p>Create an event and it will appear here for you to manage.</p>
          <Link href="/create-event" className="button button-primary">Create an event <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    </section>
  );
}

export default function ManageEventsPage() {
  return <RequireSession><ManageEventsContent /></RequireSession>;
}
