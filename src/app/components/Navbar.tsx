'use client';

import Link from 'next/link';
import { clearAuthSession, useSession } from '@/lib/auth-client';
import { betterAuthClient } from '@/lib/better-auth-client';
import { toast } from 'react-hot-toast';
import ThemeToggle from '@/app/components/ThemeToggle';
import UserAvatar from '@/app/components/UserAvatar';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    let localLogoutSucceeded = true;
    try {
      clearAuthSession();
    } catch (error) {
      console.error('Unable to clear the local sign-in session', error);
      localLogoutSucceeded = false;
    }

    let serverLogoutSucceeded = true;
    try {
      const result = await betterAuthClient.signOut();
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      console.error('Unable to revoke the Better Auth session', error);
      serverLogoutSucceeded = false;
    }

    if (!localLogoutSucceeded) {
      try {
        clearAuthSession();
        localLogoutSucceeded = true;
      } catch (error) {
        console.error('Unable to clear the local sign-in session', error);
      }
    }

    if (!localLogoutSucceeded) {
      toast.error('Unable to clear your local sign-in session. Please try again.');
    } else if (!serverLogoutSucceeded) {
      toast.error('Signed out on this tab, but the server session could not be revoked. Please try again.');
    } else {
      toast.success('Logged out successfully');
    }
    setIsSigningOut(false);
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
              <Link href="/profile" className="nav-user">
                <UserAvatar image={user.image} name={user.name} className="nav-user-avatar" />
                <span>{user.name}</span>
              </Link>
              <button type="button" onClick={handleSignOut} disabled={isSigningOut} className="nav-login">
                {isSigningOut ? 'Logging out…' : 'Log out'}
              </button>
            </div>
          ) : (
            <Link href="/login" className="nav-login">Log in</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
