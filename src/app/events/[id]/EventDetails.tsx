'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { mockEvents } from '@/lib/events';
import { joinEvent, useDemoData } from '@/lib/demo-store';
import { useSession } from '@/lib/auth-client';

export default function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { createdEvents, joins } = useDemoData();
  const event = createdEvents.find((item) => item.id === id) ?? mockEvents.find((item) => item.id === id);
  const joined = joins.some((entry) =>
    entry.eventId === id && entry.email.toLowerCase() === session?.user.email.toLowerCase(),
  );

  if (!event) {
    return (
      <div className="profile-status">
        <p>We couldn&apos;t find that event.</p>
        <Link href="/upcoming-events" className="text-link">Browse upcoming events ↗</Link>
      </div>
    );
  }

  const handleJoin = () => {
    if (!session?.user.email) {
      toast.error('Log in to join this event.');
      router.push(`/login?callbackURL=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }

    try {
      const alreadyJoined = joinEvent(id, session.user.email);
      toast.success(alreadyJoined
        ? 'You are already on this event list.'
        : 'You joined the event in this browser preview. Connect your API to share your place.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to join this event.');
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
        <button type="button" onClick={handleJoin} disabled={isPending || joined} className="button button-primary">
          {isPending ? 'Checking your account…' : joined ? 'You’re on the list' : session ? 'Join this event' : 'Log in to join'} <span aria-hidden="true">{joined ? '✓' : '↗'}</span>
        </button>
      </div>
    </section>
  );
}
