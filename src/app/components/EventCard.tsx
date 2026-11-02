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
    <Link href={`/events/${event.id}`} className="group block overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:scale-[1.02] dark:bg-gray-800">
      <div className="flex h-48 items-end bg-gradient-to-br from-indigo-500 to-purple-600 p-5 text-white">
        <span className="text-2xl font-semibold">{event.title}</span>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-900 group-hover:underline dark:text-gray-100">{event.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{event.location}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{event.type} · {formattedDate}</p>
      </div>
    </Link>
  );
};
