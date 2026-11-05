# Goodneighbor — Social Development Events Platform

Goodneighbor is a community-service events platform that helps neighbors find local ways to volunteer, organize events, and keep track of the causes they care about. This repository contains the **Next.js client**; the API server is maintained separately.

**Live site:** [event-platform-client-nu.vercel.app](https://event-platform-client-nu.vercel.app)

## Features

- Discover future community events and search by title, location, or description; filter by event type.
- View event details and join or leave events using your account.
- Create events with a description, category, photo, location, and future date.
- Manage events you created, including editing and deleting them.
- Keep a date-sorted list of events you have joined.
- Register or sign in with email and password, or continue with Google when the server's OAuth integration is configured.
- Update your profile name and photo, and switch between light and dark themes.
- Browse a community photo gallery and a newsletter sign-up section. Newsletter submission is currently a UI preview and does not subscribe an address to a mailing service.
- Use the responsive interface on mobile, tablet, and desktop.

## Tech stack

- Next.js App Router, React, and TypeScript
- Better Auth for sign-in flows
- `fetch`-based API client for event, profile, and account data
- React Hook Form for event forms

## Getting started

### Requirements

- Node.js and npm
- The separate event-platform API server, for features that require server-backed data or authentication

### Install and run

```bash
npm install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the origin of your API server. The default is `http://localhost:8000`.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Next.js development server proxies `/api/*` requests to `NEXT_PUBLIC_API_URL`.

## Available scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Build the production application
npm run start  # Start the production server (after building)
```

## API and authentication

The client expects the separate server to provide the event and account API used by the app. This includes event browsing and details, event creation and management, event joins, current-user event lists, and profile updates. Protected requests use the signed-in user's bearer token. The client keeps its authentication session in browser `sessionStorage` for the current tab; event and profile data are handled by the API rather than shared through this client repository.

Email/password sign-in and Google sign-in both depend on the server's authentication configuration. To use Google sign-in, configure the OAuth provider and callback settings on the API/auth service as well as setting `NEXT_PUBLIC_API_URL` to the API origin. Refer to the server's documentation for its required environment variables and deployment setup.

## Deploying

Deploy this repository as a separate Vercel project, using the repository root as the project root. Set `NEXT_PUBLIC_API_URL` to the deployed API server's HTTPS origin in the Vercel project environment, then deploy the client. The API/auth service must also be configured to accept the deployed client origin and its authentication callbacks.

## Project structure

```text
src/
  app/         App Router pages and shared UI components
  lib/         API, authentication, and shared utilities
```
