"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/app/components/EventCard";
import { mockEvents } from "@/lib/events";
import { useDemoData } from "@/lib/demo-store";
import { useToday } from "@/lib/date";

export default function UpcomingEventsGrid() {
  const { createdEvents } = useDemoData();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All events");
  const events = useMemo(() => [...createdEvents, ...mockEvents], [createdEvents]);
  const today = useToday();

  const eventTypes = useMemo(
    () => ["All events", ...new Set(events.map((event) => event.type))],
    [events],
  );
  const visibleEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return events
      .filter((event) => event.date >= today)
      .filter((event) => type === "All events" || event.type === type)
      .filter(
        (event) =>
          !normalizedQuery ||
          `${event.title} ${event.location} ${event.description}`
            .toLowerCase()
            .includes(normalizedQuery),
      )
      .sort((left, right) => left.date.localeCompare(right.date));
  }, [events, query, today, type]);

  return (
    <>
      <div className="event-filters">
        <label className="filter-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search events</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events or locations"
          />
        </label>
        <label className="filter-type">
          <span className="sr-only">Filter by event type</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {eventTypes.map((eventType) => (
              <option key={eventType}>{eventType}</option>
            ))}
          </select>
        </label>
      </div>
      {visibleEvents.length > 0 ? (
        <div className="event-grid">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">✳</span>
          <h2>No events found just yet.</h2>
          <p>
            Try a different search, or be the neighbor who starts something
            good.
          </p>
        </div>
      )}
    </>
  );
}
