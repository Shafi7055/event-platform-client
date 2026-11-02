import Link from 'next/link';
import { EventCard } from '@/app/components/EventCard';
import { mockEvents } from '@/lib/events';

function Banner() {
  return (
    <section className="relative h-64 md:h-96 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">Social Development Events Platform</h1>
        <p className="text-lg md:text-xl">Connect, create, and contribute to community‑service events in your area.</p>
        <Link href="/upcoming-events" className="inline-flex rounded-md bg-white px-5 py-3 font-semibold text-indigo-600 hover:bg-gray-100">
          Explore Upcoming Events
        </Link>
      </div>
    </section>
  );
}

function FeatureSection() {
  const features = [
    { title: 'Create Events', description: 'Easily add new community service events.', icon: '🛠️' },
    { title: 'Join Events', description: 'Find events you care about and sign up instantly.', icon: '🤝' },
    { title: 'Track Impact', description: 'See how many volunteers have joined your events.', icon: '📊' },
  ];
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UpcomingEvents() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Recent Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const moments = ['Neighbors helping neighbors', 'A cleaner shared space', 'Food and supplies for families'];
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {moments.map((moment) => (
            <div key={moment} className="flex min-h-48 items-end rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 p-6 text-lg font-semibold text-white">
              {moment}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
      <p className="mb-4">Subscribe to our newsletter (functionality pending).</p>
      <input type="email" placeholder="Enter your email" className="border rounded px-4 py-2 mr-2" disabled />
      <button type="button" disabled className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50">Subscribe</button>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Banner />
      <FeatureSection />
      <UpcomingEvents />
      <Gallery />
      <Newsletter />
    </>
  );
}
