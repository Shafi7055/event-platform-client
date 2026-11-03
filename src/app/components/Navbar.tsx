'use client';

import Link from 'next/link';
import { clearAuthSession, useSession } from '@/lib/auth-client';
import { betterAuthClient } from '@/lib/better-auth-client';
import { toast } from 'react-hot-toast';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const result = await betterAuthClient.signOut();
      if (result.error) throw new Error(result.error.message);
      clearAuthSession();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to log out');
    }
  };

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" className="site-brand">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>good<span className="brand-accent">neighbor</span></span>
        </Link>
        <div className="site-nav-links">
          <Link href="/upcoming-events" className="nav-link">Explore events</Link>
          <Link href="/create-event" className="nav-link nav-link-create">Create an event <span aria-hidden="true">↗</span></Link>
          <ThemeToggle />
          {isPending ? (
            <span className="nav-loading" aria-label="Loading account" />
          ) : user ? (
            <div className="nav-account">
              <Link href="/joined-events" className="nav-link nav-dashboard-link">Joined</Link>
              <Link href="/manage-events" className="nav-link nav-dashboard-link">Manage</Link>
              <Link href="/profile" className="nav-user">{user.name}</Link>
              <button type="button" onClick={handleSignOut} className="nav-login">Log out</button>
            </div>
          ) : (
            <Link href="/login" className="nav-login">Log in</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
