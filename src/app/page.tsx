import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';

// Mock data for upcoming events (replace with real API later)
const mockEvents = [
  { id: '1', title: 'Winter Clothes Distribution', location: 'Mirpur 10, Dhaka', type: 'Donation', date: '2024-12-01', thumbnail: '/event1.jpg' },
  { id: '2', title: 'Blanket Distribution for the Needy', location: 'Mohammadpur, Dhaka', type: 'Donation', date: '2024-12-05', thumbnail: '/event2.jpg' },
  { id: '3', title: 'Community Clean‑up', location: 'Gulshan, Dhaka', type: 'Cleanup', date: '2024-12-10', thumbnail: '/event3.jpg' },
];

function Banner() {
  return (
    <section className="relative h-64 md:h-96 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">Social Development Events Platform</h1>
        <p className="text-lg md:text-xl">Connect, create, and contribute to community‑service events in your area.</p>
        <Link href="/upcoming-events">
          <Button className="bg-white text-indigo-600 hover:bg-gray-100">Explore Upcoming Events</Button>
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

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Image src={event.thumbnail} alt={event.title} width={400} height={250} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
        <p className="text-sm text-gray-500 mb-1">{event.location}</p>
        <p className="text-sm text-gray-500 mb-1">{event.type}</p>
        <p className="text-sm text-gray-500 mb-2">{new Date(event.date).toLocaleDateString()}</p>
        <Link href={`/events/${event.id}`}>View Details</Link>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  const { data: events } = useQuery(['upcomingEvents'], async () => {
    // Replace with real API call when backend is ready
    // const { data } = await axios.get('/api/events?limit=6');
    // return data;
    return mockEvents;
  });

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Recent Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {events?.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = ['/gallery1.jpg', '/gallery2.jpg', '/gallery3.jpg'];
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <Image key={i} src={src} alt={`Gallery ${i + 1}`} width={400} height={250} className="rounded-lg object-cover" />
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
      <Button disabled>Subscribe</Button>
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
