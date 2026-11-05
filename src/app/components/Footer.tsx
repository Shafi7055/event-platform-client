import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-about">
          <Link href="/" className="footer-brand"><span className="brand-mark" aria-hidden="true">✳</span> goodneighbor</Link>
          <p>Making good things happen, one neighbor at a time.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/upcoming-events">Explore events</Link>
          <Link href="/create-event">Create an event</Link>
          <Link href="/joined-events">Joined events</Link>
          <Link href="/profile">Your profile</Link>
        </nav>
        <div className="footer-meta">
          <span>© 2026 Goodneighbor</span>
          <span>Built for neighbors, powered by community.</span>
        </div>
      </div>
    </footer>
  );
}
