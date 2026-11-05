"use client";

import { useEffect, useMemo, useState } from "react";
import { EventCard } from "@/app/components/EventCard";
import type { Event } from "@/lib/events";
import { useToday } from "@/lib/date";
import { apiRequest } from "@/lib/api-client";

export default function UpcomingEventsGrid() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All events");
  const today = useToday();

  useEffect(() => {
    let active = true;
    apiRequest<{ events: Event[] }>("/api/events")
      .then(({ events: upcoming }) => {
        if (active) setEvents(upcoming);
      })
      .catch((error: unknown) => {
        if (active) setLoadError(error instanceof Error ? error.message : "Unable to load events.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

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
      {loading && (
        <div className="empty-state" aria-live="polite">
          <span className="loading-spinner" />
          <p>Finding upcoming events…</p>
        </div>
      )}
      {!loading && loadError && (
        <div className="empty-state" role="alert">
          <h2>Events are unavailable right now.</h2>
          <p>{loadError}</p>
        </div>
      )}
      {!loading && !loadError && visibleEvents.length > 0 ? (
        <div className="event-grid">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : !loading && !loadError ? (
        <div className="empty-state">
          <span aria-hidden="true">✳</span>
          <h2>No events found just yet.</h2>
          <p>
            Try a different search, or be the neighbor who starts something
            good.
          </p>
        </div>
      ) : null}
    </>
  );
}
