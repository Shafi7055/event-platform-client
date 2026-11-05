"use client";

import { useForm } from "react-hook-form";
import type { Event } from "@/lib/events";
import { addDaysToDate, useToday } from "@/lib/date";

export type EventFormValues = Omit<Event, "id">;

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Community Care",
  "Education",
  "Other",
];

interface EventEditorProps {
  initialEvent?: Event;
  submitLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function EventEditor({
  initialEvent,
  submitLabel,
  onSubmit,
  onCancel,
}: EventEditorProps) {
  const tomorrow = addDaysToDate(useToday(), 1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    defaultValues: initialEvent
      ? {
          title: initialEvent.title,
          description: initialEvent.description,
          type: initialEvent.type,
          thumbnail: initialEvent.thumbnail,
          location: initialEvent.location,
          date: initialEvent.date.slice(0, 10),
        }
      : { type: "Cleanup" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-card">
      <label className="form-field">
        Event name
        <input
          {...register("title", { required: "Add a name for your event." })}
          className="form-input"
          placeholder="Neighborhood clean-up day"
        />
        {errors.title && (
          <span className="form-error">{errors.title.message}</span>
        )}
      </label>

      <label className="form-field">
        What will happen?
        <textarea
          {...register("description", {
            required: "Tell neighbors what this event is about.",
          })}
          className="form-input form-textarea"
          placeholder="Share what you’ll do, who it helps, and what volunteers can expect."
          rows={4}
        />
        {errors.description && (
          <span className="form-error">{errors.description.message}</span>
        )}
      </label>

      <label className="form-field">
        Event type
        <select
          {...register("type", { required: "Choose an event type." })}
          className="form-input"
        >
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field">
        Event photo URL
        <input
          {...register("thumbnail", {
            required: "Add a photo URL.",
            validate: (value) => {
              try {
                const url = new URL(value);
                return (
                  url.protocol === "https:" || "Use a valid HTTPS photo link."
                );
              } catch {
                return "Enter a valid photo URL.";
              }
            },
          })}
          className="form-input"
          type="url"
          placeholder="https://images.unsplash.com/..."
        />
        {errors.thumbnail && (
          <span className="form-error">{errors.thumbnail.message}</span>
        )}
        <span className="form-help">
          Paste a direct image link. It will appear on your event card.
        </span>
      </label>

      <div className="form-row">
        <label className="form-field">
          Where is it?
          <input
            {...register("location", { required: "Add the event location." })}
            className="form-input"
            placeholder="Mirpur 10, Dhaka"
          />
          {errors.location && (
            <span className="form-error">{errors.location.message}</span>
          )}
        </label>
        <label className="form-field">
          Event date
          <input
            {...register("date", {
              required: "Choose a date in the future.",
              min: { value: tomorrow, message: "Choose a date in the future." },
            })}
            className="form-input"
            type="date"
            min={tomorrow}
          />
          {errors.date && (
            <span className="form-error">{errors.date.message}</span>
          )}
        </label>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="button button-primary form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving…" : submitLabel}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
