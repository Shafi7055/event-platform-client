'use client';

import React, { useState } from 'react';
import { setAuthSession } from '@/lib/auth-client';
import { exchangeAuthSession } from '@/lib/auth-session-exchange';
import { betterAuthClient } from '@/lib/better-auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const requested = new URLSearchParams(window.location.search).get('callbackURL');
      const destination = requested?.startsWith('/') && !requested.startsWith('//')
        ? requested
        : '/';
      const callbackURL = new URL('/auth/callback', window.location.origin);
      callbackURL.searchParams.set('callbackURL', destination);

      const result = await betterAuthClient.signIn.social({
        provider: 'google',
        callbackURL: callbackURL.toString(),
      });
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Google sign-in failed.');
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = mode === 'login'
        ? await betterAuthClient.signIn.email({ email, password })
        : await betterAuthClient.signUp.email({ name, email, password });
      if (result.error) throw new Error(result.error.message);
      setAuthSession(await exchangeAuthSession());

      toast.success(mode === 'login' ? 'Logged in successfully.' : 'Your account is ready.');
      const callbackUrl = new URLSearchParams(window.location.search).get('callbackURL');
      const destination = callbackUrl?.startsWith('/') && !callbackUrl.startsWith('//')
        ? callbackUrl
        : '/';
      router.push(destination);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-card">
      <span className="eyebrow"><span className="eyebrow-dot" /> A little good starts here</span>
      <h1>{mode === 'login' ? 'Welcome back.' : 'Come on in.'}</h1>
      <p className="auth-intro">{mode === 'login' ? 'Log in to find your next way to show up.' : 'Create an account and find your people.'}</p>
      <button
        type="button"
        className="button button-secondary auth-submit"
        onClick={handleGoogleSignIn}
        disabled={loading || googleLoading}
      >
        {googleLoading ? 'Connecting to Google…' : 'Continue with Google'}
      </button>
      <div className="auth-divider"><span>or use your email</span></div>
      {mode === 'register' && (
        <label className="auth-field">
          Your name
          <input type="text" autoComplete="name" placeholder="Jamie Rivera" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      )}
      <label className="auth-field">
        Email address
        <input type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="auth-field">
        Password
        <input type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 8 characters" minLength={mode === 'register' ? 8 : undefined} maxLength={128} value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit" disabled={loading || googleLoading} className="button button-primary auth-submit">
        {loading ? 'One moment…' : mode === 'login' ? 'Log in' : 'Create account'} <span aria-hidden="true">↗</span>
      </button>
      <p className="auth-switch">
        {mode === 'login' ? 'New around here?' : 'Already part of the neighborhood?'}{' '}
        <Link href={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Create an account' : 'Log in'}</Link>
      </p>
    </form>
  );
};

export default AuthForm;
