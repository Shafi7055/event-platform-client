'use client';

import Link from 'next/link';
import { signOut, useSession } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error.message ?? 'Unable to log out');
        return;
      }
      toast.success('Logged out successfully');
    } catch (error) {
      console.error(error);
      toast.error('Unable to log out');
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gray-800 dark:text-white">Social Events Platform</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/upcoming-events" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Upcoming Events</Link>
        <ThemeToggle />
        {isPending ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-gray-800 dark:text-gray-200 md:inline">{user.name}</span>
            <button type="button" onClick={handleSignOut} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="rounded bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
