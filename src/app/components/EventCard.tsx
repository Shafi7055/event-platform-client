import Link from 'next/link';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

export interface EventCardProps {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  imageUrl?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ id, title, date, location, imageUrl }) => {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/events/${id}`} className="group block rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] bg-white dark:bg-gray-800">
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <span className="text-2xl font-semibold">{title}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 space-x-4">
          <div className="flex items-center">
            <CalendarIcon size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon size={16} className="mr-1" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
