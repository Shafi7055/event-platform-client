import { Suspense } from 'react';
import EventDetails from './EventDetails';

export default function EventDetailsPage({ params }: PageProps<'/events/[id]'>) {
  return (
    <Suspense fallback={<div className="profile-status">Finding the details…</div>}>
      <EventDetails params={params} />
    </Suspense>
  );
}
