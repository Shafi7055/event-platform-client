'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success('Thanks for your interest! Newsletter signup will be connected to the service later.');
    setEmail('');
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
      <input
        id="newsletter-email"
        type="email"
        autoComplete="email"
        placeholder="Your email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button type="submit" className="button button-primary">Keep me in the loop <span aria-hidden="true">↗</span></button>
    </form>
  );
}
