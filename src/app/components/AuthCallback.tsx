'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { exchangeAuthSession } from '@/lib/auth-session-exchange';
import { setAuthSession } from '@/lib/auth-client';

function getSafeDestination() {
  const requested = new URLSearchParams(window.location.search).get('callbackURL');
  return requested?.startsWith('/') && !requested.startsWith('//') ? requested : '/';
}

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const destination = getSafeDestination();

    async function finishSignIn() {
      try {
        setAuthSession(await exchangeAuthSession());
        if (active) router.replace(destination);
      } catch (signInError) {
        console.error('Unable to complete Google sign-in', signInError);
        if (active) {
          setError(
            signInError instanceof Error
              ? signInError.message
              : 'Unable to finish signing in with Google.',
          );
        }
      }
    }

    void finishSignIn();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="private-status" aria-live="polite">
      {error ? (
        <>
          <span className="eyebrow">Google sign-in</span>
          <h1>We couldn&apos;t finish signing you in.</h1>
          <p role="alert">{error}</p>
          <Link href="/login" className="button button-primary">Back to login</Link>
        </>
      ) : (
        <>
          <span className="loading-spinner" />
          <p>Finishing your sign-in…</p>
        </>
      )}
    </div>
  );
}
