import { Suspense } from 'react';
import EventDetails from './EventDetails';
import { mockEvents } from '@/lib/events';

export function generateStaticParams() {
  return mockEvents.map(({ id }) => ({ id }));
}

export default function EventDetailsPage({ params }: PageProps<'/events/[id]'>) {
  return (
    <Suspense fallback={<div className="profile-status">Finding the details…</div>}>
      <EventDetails params={params} />
    </Suspense>
  );
}
