import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="footer-brand"><span className="brand-mark" aria-hidden="true">✳</span> goodneighbor</Link>
        <p>Making good things happen, one neighbor at a time.</p>
        <div className="footer-meta">
          <span>© 2026 goodneighbor</span>
          <Link href="/upcoming-events">Find an event</Link>
        </div>
      </div>
    </footer>
  );
}
