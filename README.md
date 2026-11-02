# Social Events Platform

A community-events platform built with Next.js, React, and Better Auth. The app includes a landing page, an upcoming-events listing, and email/password login and registration pages.

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Authentication configuration

Set these environment variables in your local environment (for example, in `.env.local`) before using authentication:

```text
BETTER_AUTH_SECRET=<a securely generated secret>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Google credentials (`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`) are optional. Never commit real secrets. The current auth setup does not configure a persistent database adapter; configure one before deploying if accounts must persist.

## Validation

```bash
npm run lint
npm run build
```
