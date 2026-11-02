import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EventCard } from '@/components/EventCard';
import { ToastContainer, toast } from 'react-hot-toast';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/events?limit=6`)
      .then((res) => setEvents(res.data))
      .catch(() => toast.error('Failed to load recent events'));
  }, []);

  return (
    <main className="space-y-16">
      {/* Banner */}
      <section className="relative h-96 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Social Development Events Platform</h1>
          <p className="text-lg mb-6">
            Join, create, and track community service events in your local area.
          </p>
          <Link
            href="/upcoming-events"
            className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition"
          >
            Explore Upcoming Events
          </Link>
        </div>
        <Image src="/banner.jpg" alt="Banner" fill className="object-cover opacity-70" />
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">Community Collaboration</h3>
          <p>Connect with local volunteers and organizations.</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-bold mb-2">Event Management</h3>
          <p>Create, edit, and track events with ease.</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-bold mb-2">Impact Tracking</h3>
          <p>See how many people have joined and contributed.</p>
        </div>
      </section>

      {/* Recent Upcoming Events */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Recent Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/upcoming-events" className="text-indigo-600 hover:underline">
            View all events →
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <Image
              key={num}
              src={`/gallery/${num}.jpg`}
              alt={`Gallery ${num}`}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </section>

      {/* Newsletter (static) */}
      <section className="bg-indigo-50 dark:bg-gray-800 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest events and updates.</p>
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 w-full md:w-2/3 rounded-l-md border-t border-b border-l focus:outline-none"
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition">
            Subscribe
          </button>
        </div>
      </section>

      <ToastContainer />
    </main>
  );
}

// EventCard component (shadcn UI Card)
function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event._id}`} className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="relative h-48 w-full">
        <Image src={event.thumbnailUrl || '/default-event.jpg'} alt={event.title} fill className="object-cover" />
      </div>
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-1 truncate">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.location}</p>
        <p className="text-sm text-gray-500 mt-1">{new Date(event.eventDate).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
