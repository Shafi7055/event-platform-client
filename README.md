# Goodneighbor — Social Development Events Platform

Goodneighbor is a community service events client built with Next.js App Router. It helps neighbors discover local volunteer opportunities and provides a clear interface for organizers and participants.

**Live site:** https://event-platform-client-nu.vercel.app

## What you can do

- Discover upcoming community events and filter by event type or location.
- Explore event details and preview the join flow.
- Create community events with a future date, category, location, and photo URL.
- Review, edit, and remove events from the organizer dashboard.
- See and manage events joined from your account.
- Update a profile preview and switch between light and dark themes.
- Browse a responsive gallery of community-service photography.

## Client-only preview

Event creation, joins, organizer edits, and profile edits are currently stored in the browser as a demonstration flow; they are not shared across users or devices. Authentication uses the configured API and Better Auth service.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connect the API

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to the origin of the Express API (default `http://localhost:8000`). Run the client on port `3000` and configure the backend CORS origin to `http://localhost:3000`.

Email/password registration and login use the API and receive a signed JWT. The client sends it with protected API requests and keeps it in session storage for the current browser tab. The MongoDB URI and JWT signing secret are backend-only settings; never put them in `NEXT_PUBLIC_*` variables or this client repository.

## Deploy to Vercel

Deploy this Next.js client as its own Vercel project, with `event-platform-client` as the project root directory. Set `NEXT_PUBLIC_API_URL` to the HTTPS origin of the separately deployed API (without a trailing slash), then deploy or redeploy the client. The client proxies `/api/*` to that API, so endpoints such as `/api/events` are also available on the client origin. Configure the API project's `CORS_ORIGIN` with the exact deployed client origin. See the [API deployment instructions](https://github.com/Shafi7055/event-platform-server#deploy-to-vercel) for its Vercel project and required server-side environment variables.

## Google sign-in

The server uses Better Auth with Google OAuth and MongoDB. Configure `BETTER_AUTH_SECRET` with a random value of at least 32 characters, set `BETTER_AUTH_URL` to the client origin, and keep `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` on the server only. Auth requests are proxied through the client origin so the browser can retain the OAuth state cookie. Set the Google OAuth authorized redirect URI to `<BETTER_AUTH_URL>/api/auth/callback/google` (locally: `http://localhost:3000/api/auth/callback/google`). Set `CORS_ORIGIN` to the client origin.

The client uses `NEXT_PUBLIC_API_URL` to reach the server. After Google verifies the user, the server exchanges the Better Auth session for the JWT format used by the existing protected API routes.

## Validation

```bash
npm run lint
npm run build
```
