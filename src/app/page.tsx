import Image from 'next/image';
import Link from 'next/link';
import HomeUpcomingEvents from '@/app/components/HomeUpcomingEvents';
import NewsletterSignup from '@/app/components/NewsletterSignup';

const highlights = [
  { value: 'Show up', label: 'in a way that fits your life' },
  { value: 'Pitch in', label: 'for the things you care about' },
  { value: 'Come back', label: 'with a few new friends' },
];

const pillars = [
  {
    number: '01',
    title: 'Find your people',
    description: 'Meet neighbors who care about the same things you do, right where you live.',
  },
  {
    number: '02',
    title: 'Make a real difference',
    description: 'Choose a small way to help. Together, the small things add up to something big.',
  },
  {
    number: '03',
    title: 'Bring an idea to life',
    description: 'Have a cause close to your heart? Create an event and invite your community in.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> Good things happen together</span>
          <h1>Small acts.<br /><span>Lasting impact.</span></h1>
          <p className="hero-description">
            Find your people, show up for your neighborhood, and make a difference that feels close to home.
          </p>
          <div className="hero-actions">
            <Link href="/upcoming-events" className="button button-primary">
              Find an event <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/create-event" className="button button-secondary">Start something</Link>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>N</span><span>A</span><span>J</span>
            </div>
            <p><strong>Good company, close by.</strong><br />Join your local community.</p>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=85"
            alt="Volunteers packing boxes of food for community distribution"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
            className="hero-image"
          />
          <div className="hero-image-shade" />
          <div className="hero-caption">
            <span className="caption-icon" aria-hidden="true">✳</span>
            <div><strong>Show up. Make a little magic.</strong><span>Real people, real good.</span></div>
          </div>
          <div className="hero-floating-note"><span>✦</span> Your neighborhood needs you</div>
        </div>
      </section>

      <section className="impact-strip" aria-label="Community impact">
        {highlights.map((highlight) => (
          <div className="impact-item" key={highlight.label}>
            <strong>{highlight.value}</strong>
            <span>{highlight.label}</span>
          </div>
        ))}
        <p>And it all starts with showing up.</p>
      </section>

      <HomeUpcomingEvents />

      <section className="community-section">
        <div className="community-image">
          <Image
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=85"
            alt="Volunteers sharing a moment after helping their community"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className="community-copy">
          <span className="eyebrow">This is what community looks like</span>
          <h2>There&apos;s a place for <span>you here.</span></h2>
          <p>You don&apos;t need special skills or a ton of time. Just bring yourself. We&apos;ll help you find a way to pitch in that fits your life.</p>
          <Link href="/upcoming-events" className="button button-light">Come as you are <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section-wrap pillars-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A little goes a long way</span>
            <h2>Good starts <span>right here.</span></h2>
          </div>
        </div>
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.number}>
              <span className="pillar-number">{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap gallery-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A few moments that matter</span>
            <h2>Good looks good <span>on everyone.</span></h2>
          </div>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-photo gallery-photo-tall">
            <Image src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85" alt="Neighbors sharing a moment at a community gathering" fill sizes="(max-width: 700px) 100vw, 42vw" />
            <figcaption>Hands in, hearts open.</figcaption>
          </figure>
          <figure className="gallery-photo">
            <Image src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=85" alt="Community donations ready to be shared" fill sizes="(max-width: 700px) 100vw, 28vw" />
            <figcaption>Good things, shared.</figcaption>
          </figure>
          <figure className="gallery-photo">
            <Image src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=85" alt="A flourishing garden tended with care" fill sizes="(max-width: 700px) 100vw, 28vw" />
            <figcaption>Room to grow.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section-wrap newsletter-section">
        <div className="newsletter-copy">
          <span className="eyebrow">A little good in your inbox</span>
          <h2>Stay close to <span>what matters.</span></h2>
          <p>Get a friendly note when good things are happening around your neighborhood.</p>
        </div>
        <NewsletterSignup />
      </section>

      <section className="closing-cta">
        <div>
          <span className="eyebrow">Your community is calling</span>
          <h2>Let&apos;s make good <span>happen.</span></h2>
        </div>
        <Link href="/upcoming-events" className="button button-primary">Find your first event <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
