export interface Event {
  id: string;
  title: string;
  location: string;
  type: string;
  date: string;
  thumbnail: string;
  description: string;
}

export const mockEvents = [
  {
    id: '1',
    title: 'Winter Clothes Distribution',
    location: 'Mirpur 10, Dhaka',
    type: 'Donation',
    date: '2026-12-01',
    thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85',
    description: 'Distribute winter clothes to families in need.',
  },
  {
    id: '2',
    title: 'Blanket Distribution for the Needy',
    location: 'Mohammadpur, Dhaka',
    type: 'Donation',
    date: '2026-12-05',
    thumbnail: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=85',
    description: 'Provide blankets to homeless individuals.',
  },
  {
    id: '3',
    title: 'Community Clean‑up',
    location: 'Gulshan, Dhaka',
    type: 'Cleanup',
    date: '2026-12-10',
    thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=85',
    description: 'Volunteer to clean streets and parks.',
  },
  {
    id: '4',
    title: 'Food Drive',
    location: 'Dhanmondi, Dhaka',
    type: 'Donation',
    date: '2026-12-15',
    thumbnail: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85',
    description: 'Collect and distribute food to low‑income families.',
  },
  {
    id: '5',
    title: 'Neighborhood Garden Day',
    location: 'Banani, Dhaka',
    type: 'Plantation',
    date: '2026-12-19',
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85',
    description: 'Plant flowers and native greenery in a shared neighborhood space.',
  },
  {
    id: '6',
    title: 'Community Care Visit',
    location: 'Uttara, Dhaka',
    type: 'Community Care',
    date: '2026-12-22',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85',
    description: 'Spend a warm afternoon connecting with local seniors.',
  },
] satisfies Event[];
