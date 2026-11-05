<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Social Development Events Platform

This repository is the **client codebase only**. The server lives in a separate codebase. Implement the frontend UI and client-side flows here; do not create or modify backend services. Use the existing API and authentication integrations, and coordinate against their contracts rather than assuming or inventing server behavior.

Build a responsive community-service event platform for discovering and managing local social development events, such as clothing or blanket distributions.

### Product requirements

- Provide a shared navbar, route-driven main content, and an informative, visually engaging footer.
- Build a public home page with a community-service themed banner, feature highlights, six recent upcoming events, a static event-photo gallery, and a newsletter subscription section (design only; no subscription functionality required).
- Provide email/password login and registration pages. Do not add email verification or password recovery unless specifically requested.
- Provide a private create-event page. Events include a title, description, event type, thumbnail image URL, location, future event date, and creator email. Prevent selecting past dates; on success, show a non-alert success message and navigate to Upcoming Events.
- Provide a public Upcoming Events page showing only events whose dates are in the future. Cards should have consistent sizing and show the image, title, location, type, date, and a View Event action.
- Provide a public event details page. Joining an event requires a logged-in user and should use the existing server/API integration to persist the join.
- Provide a private Joined Events page for the current user's joined events, sorted by event date.
- Provide a private Manage Events page for the current user's events, with update and delete actions. Enforce ownership through the existing authenticated API; client-side visibility or route guards are not a substitute for server authorization.
- Add a user-controlled light/dark theme toggle that applies consistently across the application.
- Implement useful input validation and user-visible loading, success, and error states. Never use Lorem ipsum or the browser's default `alert()` for feedback.
- Use the latest X logo rather than the retired Twitter bird if social links are shown.

### Design and quality

- Use the project's existing framework, component library, styling conventions, and API/authentication patterns.
- Keep headings, typography, spacing, buttons, images, and card dimensions consistent across sections.
- Ensure layouts work on mobile, tablet, and desktop.
- Prefer loading skeletons where data is loading. Consider a profile view/update flow (name and profile picture) and one additional differentiating feature when appropriate to the requested scope.
- Keep the client compatible with the separate server's authentication contract, including JWT-backed protected API requests where that integration exists. Do not claim client-only checks provide API security.
- Update the client README with the website name, live-site URL, and at least five meaningful feature bullets when deployment details are available.
