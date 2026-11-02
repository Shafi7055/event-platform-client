export interface Event {
  id: string;
  title: string;
  location: string;
  type: string;
  date: string;
}

export const mockEvents: Event[] = [
  { id: '1', title: 'Winter Clothes Distribution', location: 'Mirpur 10, Dhaka', type: 'Donation', date: '2026-12-01' },
  { id: '2', title: 'Blanket Distribution for the Needy', location: 'Mohammadpur, Dhaka', type: 'Donation', date: '2026-12-05' },
  { id: '3', title: 'Community Clean‑up', location: 'Gulshan, Dhaka', type: 'Cleanup', date: '2026-12-10' },
];
