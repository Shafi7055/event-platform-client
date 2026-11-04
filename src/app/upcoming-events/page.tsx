import UpcomingEventsGrid from '@/app/components/UpcomingEventsGrid';

export default function UpcomingEventsPage() {
  return (
    <section className="events-page section-wrap">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Good things are happening near you</span>
          <h1>Find your <span>next thing.</span></h1>
          <p>Show up for a cause you care about. We saved you a spot.</p>
        </div>
      </div>
      <UpcomingEventsGrid />
    </section>
  );
}
