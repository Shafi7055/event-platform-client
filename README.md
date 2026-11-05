# Goodneighbor — Social Development Events Platform

Goodneighbor is a responsive community-service platform for discovering and managing local social development events such as clothing drives, blanket distributions, food support outreach, and neighborhood volunteer gatherings. The client app helps residents find upcoming opportunities, create their own events, join community initiatives, and keep track of their involvement.

Live site: https://event-platform-client-nu.vercel.app

## Highlights

- Discover upcoming community-service events with event images, locations, dates, and categories.
- Browse a public home page featuring a community-focused hero banner, gallery, feature callouts, and recent events.
- Create new events with a title, description, event type, thumbnail image URL, address/location, and future date.
- Join events as a logged-in user and keep a personalized list of events you have joined.
- Manage your own created events with update and delete actions through the authenticated API.
- Update your profile name and image, and switch between light and dark themes across the app.
- Use a mobile-friendly, responsive layout built with Next.js and the existing API/auth patterns.
- Review upcoming events filtered to the future only, with consistent card layouts and clear action buttons.

## Features

- Public home page with hero section, feature highlights, six recent upcoming events, photo gallery, and newsletter preview section.
- Email/password registration and login flows using the project’s existing Better Auth integration.
- Private create-event page for authenticated users, including validation and date restrictions to prevent past-date submissions.
- Public upcoming events page showing only future events with consistent card sizing and event details.
- Public event details page with join functionality guarded by authenticated API access.
- Private joined-events page that lists events the current user has joined, sorted by date.
- Private manage-events page that shows ownership-based controls for editing and deleting user-created events.
- User-controlled light/dark theme toggle for consistent application-wide styling.
- Useful validation and user feedback states for loading, success, and error messaging.

## Tech stack

- Next.js App Router
- React 19 and TypeScript
- Tailwind CSS
- Better Auth
- React Hook Form
- Axios for API requests
- TanStack React Query for client-side data handling

## Getting started

### Prerequisites

- Node.js 18+ or the version required by the project
- npm
- A running backend API service for authenticated flows and event data

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file and configure the app to point to your API server:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project purpose

This repository contains the client-side application only. The server-side API and authentication services live in a separate codebase. The frontend follows that API contract and does not assume or invent backend behavior.

## Notes on auth and security

- Protected routes and actions rely on the server's authenticated API contract.
- Client-side checks are not a substitute for backend authorization.
- Email verification and password recovery are intentionally not added unless the backend and product requirements explicitly require them.

## Deployment

Deploy this project as a standalone Vercel app using the repo root as the project root. Set `NEXT_PUBLIC_API_URL` to the deployed API server's HTTPS origin in the environment settings for the deployment.

## Project structure

```text
src/
  app/
  components/
  lib/
  styles/
```

The app uses the App Router, shared layout patterns, and route-driven pages for the public and private event workflows.
