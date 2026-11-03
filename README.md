# Goodneighbor — Social Development Events Platform

Goodneighbor is a community service events client built with Next.js App Router. It helps neighbors discover local volunteer opportunities and provides a clear interface for organizers and participants.

**Live site:** Not deployed yet — add the Vercel or Render URL here after deployment.

## What you can do

- Discover upcoming community events and filter by event type or location.
- Explore event details and join events with your account.
- Create community events with a future date, category, location, and photo URL.
- Review, edit, and remove events from the organizer dashboard.
- See and manage events joined from your account.
- Update your profile and switch between light and dark themes.
- Browse a responsive gallery of community-service photography.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connect the API

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to the origin of the Express API (default `http://localhost:8000`). Run the client on port `3000` and configure the backend CORS origin to `http://localhost:3000`.

Email/password registration and login use the API and receive a signed JWT. The client sends it as a Bearer token on protected API requests and keeps it in session storage for the current browser tab. Events, joins, and profile edits are persisted by the API. The MongoDB URI and JWT signing secret are backend-only settings; never put them in `NEXT_PUBLIC_*` variables or this client repository.

## Google sign-in

The server uses Better Auth with Google OAuth and MongoDB. Configure `BETTER_AUTH_SECRET` with a random value of at least 32 characters, set `BETTER_AUTH_URL` to the server origin, and keep `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` on the server only. Set the Google OAuth authorized redirect URI to `<BETTER_AUTH_URL>/api/auth/callback/google` (for local development: `http://localhost:8000/api/auth/callback/google`). Set `CLIENT_ORIGIN` to the client origin so credentialed auth requests are accepted.

The client uses `NEXT_PUBLIC_API_URL` to reach the server. After Google verifies the user, the server exchanges the Better Auth session for the JWT format used by the existing protected API routes.

## Validation

```bash
npm run lint
npm run build
```
