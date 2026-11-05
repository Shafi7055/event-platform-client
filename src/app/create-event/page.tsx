'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import EventEditor, { type EventFormValues } from '@/app/components/EventEditor';
import RequireSession from '@/app/components/RequireSession';
import { useSession } from '@/lib/auth-client';
import { apiRequest } from '@/lib/api-client';

function CreateEventForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreate = async (values: EventFormValues) => {
    if (!session?.user.email) {
      toast.error('Log in again before creating an event.');
      return;
    }

    try {
      await apiRequest<{ event: unknown }>('/api/events', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      toast.success('Your event is live.');
      router.push('/upcoming-events');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create the event.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-page-heading">
        <span className="eyebrow"><span className="eyebrow-dot" /> Make a little good happen</span>
        <h1>Start something <span>good.</span></h1>
        <p>Bring your idea to life and invite your neighbors to be part of it.</p>
        <div className="creator-note">
          <span aria-hidden="true">✉</span>
          <div><strong>Event organizer</strong><span>{session?.user.email}</span></div>
        </div>
      </div>
      <EventEditor submitLabel="Create your event" onSubmit={handleCreate} />
    </div>
  );
}

export default function CreateEventPage() {
  return <RequireSession><CreateEventForm /></RequireSession>;
}
