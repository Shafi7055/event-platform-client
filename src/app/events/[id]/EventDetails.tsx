'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import type { Event } from '@/lib/events';
import { apiRequest } from '@/lib/api-client';
import { useSession } from '@/lib/auth-client';

export default function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [joinedByUserId, setJoinedByUserId] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const joined = Boolean(session && joinedByUserId === session.user.id);

  useEffect(() => {
    let active = true;
    apiRequest<{ event: Event }>(`/api/events/${id}`)
      .then(({ event: result }) => {
        if (active) setEvent(result);
      })
      .catch((error: unknown) => {
        if (active) setLoadError(error instanceof Error ? error.message : 'Unable to load this event.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (isPending || !session) return;

    let active = true;
    apiRequest<{ events: Event[] }>('/api/users/me/joins')
      .then(({ events }) => {
        if (active && events.some((item) => item.id === id)) setJoinedByUserId(session.user.id);
      })
      .catch((error: unknown) => {
        if (active) toast.error(error instanceof Error ? error.message : 'Unable to check your joined events.');
      });
    return () => { active = false; };
  }, [id, isPending, session]);

  if (loading) {
    return <div className="profile-status" aria-live="polite"><span className="loading-spinner" /><p>Loading event…</p></div>;
  }

  if (loadError || !event) {
    return (
      <div className="profile-status">
        <p>{loadError || 'We couldn&apos;t find that event.'}</p>
        <Link href="/upcoming-events" className="text-link">Browse upcoming events ↗</Link>
      </div>
    );
  }

  const handleJoin = async () => {
    if (!session?.user.email) {
      toast.error('Log in to join this event.');
      router.push(`/login?callbackURL=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }

    setJoining(true);
    try {
      await apiRequest<{ joined: boolean }>(`/api/events/${id}/join`, { method: 'POST' });
      setJoinedByUserId(session.user.id);
      toast.success('You joined the event.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to join this event.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <section className="event-detail">
      <Link href="/upcoming-events" className="text-link">← All events</Link>
      <div className="event-detail-image">
        <Image src={event.thumbnail} alt={event.title} fill unoptimized priority sizes="(max-width: 800px) 100vw, 1100px" />
      </div>
      <div className="event-detail-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> {event.type} · {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        <h1>{event.title}</h1>
        <p className="event-detail-location">{event.location}</p>
        <p className="event-detail-description">{event.description}</p>
        <button type="button" onClick={handleJoin} disabled={isPending || joining || joined} className="button button-primary">
          {isPending ? 'Checking your account…' : joining ? 'Joining…' : joined ? 'You’re on the list' : session ? 'Join this event' : 'Log in to join'} <span aria-hidden="true">{joined ? '✓' : '↗'}</span>
        </button>
      </div>
    </section>
  );
}
