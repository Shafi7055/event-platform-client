'use client';

import Link from 'next/link';
import { EventCard } from '@/app/components/EventCard';
import { mockEvents, type Event } from '@/lib/events';
import { useDemoData } from '@/lib/demo-store';
import { useToday } from '@/lib/date';

export default function HomeUpcomingEvents() {
  const { createdEvents } = useDemoData();
  const localDate = useToday();
  const events: Event[] = [...createdEvents, ...mockEvents]
      .filter((event) => event.date >= localDate)
      .sort((left, right) => left.date.localeCompare(right.date))
      .slice(0, 6);

  return (
    <section className="section-wrap events-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A good place to start</span>
          <h2>Find your next <span>feel-good</span></h2>
        </div>
        <Link href="/upcoming-events" className="text-link">See all events <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="event-grid">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}
