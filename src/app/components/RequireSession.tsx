'use client';

import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

export default function RequireSession({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="private-status" aria-live="polite">
        <span className="loading-spinner" />
        <p>Checking your account…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="private-status">
        <span className="private-icon" aria-hidden="true">✳</span>
        <span className="eyebrow">Members of the neighborhood</span>
        <h1>Come on in.</h1>
        <p>Log in to see this page and take part in your community.</p>
        <div className="private-actions">
          <Link href="/login" className="button button-primary">Log in</Link>
          <Link href="/register" className="button button-secondary">Create an account</Link>
        </div>
      </div>
    );
  }

  return children;
}
