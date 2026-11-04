import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/lib/events';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/events/${event.id}`} className="event-card group">
      <div className="event-card-image">
        <Image src={event.thumbnail} alt="" fill unoptimized sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className="event-type">{event.type}</span>
      </div>
      <div className="event-card-content">
        <div className="event-card-date">{formattedDate}</div>
        <h3>{event.title}</h3>
        <p>{event.location}</p>
        <span className="event-card-link">View event <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  );
};
