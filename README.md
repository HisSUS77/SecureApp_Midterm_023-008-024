# Project Overview — Node Admin Dashboard

## Quick summary

This repository is a Next.js admin dashboard for managing projects. It uses the Next.js App Router, Tailwind CSS for styling, and MongoDB (via Mongoose) for persistence. The UI includes a dashboard with project cards, components for header/sidebar/trending, and CRUD API routes for projects and an admin endpoint for authentication lookup.

---

## How to run (local development)

1. Install dependencies:

```bash
npm install
```

2. Create an environment file with your MongoDB connection string (required):

- Create a `.env.local` in the project root
- Add the variable:

```
MONGODB_URI=<your-mongodb-connection-string>
```

3. Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000

Notes:
- The `dbConnect` utility requires `MONGODB_URI` and will throw an error if it's not set.
- The project uses Tailwind CSS and PostCSS for styling; ensure `npm install` finishes and the `dev` script (Next) runs.

---

## Top-level files of interest

- `package.json` — scripts and dependencies
  - scripts: `dev`, `build`, `start`, `lint`
  - important dependencies: `next` (15.1.2), `react` (19.x), `mongoose`, `react-icons`, `realm-web`, `tailwindcss` (devDependency)

- `next.config.mjs` — Next config (currently empty)
- `jsconfig.json` — path mapping (`@/*` -> `./*`)
- `tailwind.config.mjs` & `postcss.config.mjs` — Tailwind/PostCSS config
- `PROJECT_OVERVIEW.md` — (this file)
- `README.md` — default create-next-app README

---

## App structure (folders)

- `app/`
  - `globals.css` — global styles
  - `layout.js` — root layout (metadata and wrapper)
  - `page.js` — main dashboard page (fetches projects and composes components)
  - `api/`
    - `admin/route.js` — GET endpoint returning admin users
    - `projects/route.js` — POST, GET, PUT, DELETE for project CRUD
  - `components/` — React UI components used in the dashboard
    - `Announcements.jsx` — placeholder announcement component
    - `Header.jsx` — header with search and actions
    - `ProjectCard.jsx` — project card with edit/delete UI and request handlers
    - `Sidebar.jsx` — left-side navigation
    - `Trending.jsx` — trending users/cards
  - `dashboard/`, `home/`, `login/`, `upload/` — pages; `login/page.jsx` contains client-side login UI

- `models/`
  - `admin.js` — Mongoose Admin model
  - `project.js` — Mongoose Project model

- `utils/`
  - `dbConnect.js` — MongoDB connection helper (uses `MONGODB_URI` from env)

- `public/` — static assets (images used in header, trending, login background, etc.)

---

## Data models

- Admin (models/admin.js)
  - fields: `user` (String), `pass` (String)
  - Notes: plaintext passwords are currently used. This is insecure for production — consider hashing (bcrypt) and using proper auth/session management.

- Project (models/project.js)
  - fields:
    - `title` (String, required)
    - `description` (String, required)
    - `githubLink` (String, required)
  - timestamps enabled

---

## API endpoints (app router handlers)

- `GET /api/admin` — returns admin users list
  - Implementation notes: Calls `dbConnect()` then reads `Admin.find()` and returns JSON: `{ result: true, data: adminData }`
  - Error handling: returns `{ result: false, error }` with status 500 on failure

- `GET /api/projects` — returns list of projects
- `POST /api/projects` — create a new project (expects JSON body `{ title, description, githubLink }`)
- `PUT /api/projects` — update a project (expects JSON `{ id, title, description }`)
- `DELETE /api/projects` — delete a project (expects JSON `{ id }`)

All project routes call `dbConnect()` before interacting with Mongoose.

---

## Client-side behavior & notable components

- `app/page.js` (Home) — fetches `/api/projects` on mount and stores projects in state; renders a grid of `ProjectCard` components and side widgets.
- `ProjectCard.jsx` — contains UI and client-side handlers to call `DELETE` and `PUT` on `/api/projects`. It calls provided `onDelete` and `onUpdate` callbacks to update parent state.
- `login/page.jsx` — client-side form that fetches `/api/admin` and compares the entered credentials with returned admin list. If matched, routes to `/`.
  - Security note: This is an insecure login flow for production (fetching all admin users and checking credentials client-side). Use server-side authentication (hash passwords, issue tokens/cookies) for production.
- `Header` and `Sidebar` — purely client navigation and presentation.

---

## Environment variables

- `MONGODB_URI` — required, used by `utils/dbConnect.js`.

Consider adding:
- `.env.example` with a placeholder `MONGODB_URI=` to help onboarding.

---

## Known/likely issues & suggestions

- Security:
  - Admin passwords are stored and compared in plaintext. Implement hashed passwords (bcrypt) and server-side authentication flows (JWT or HTTP-only session cookies).
  - The `login` page fetches the entire admin list and verifies credentials client-side. Move authentication to a server-side route that validates credentials and returns a session.

- Data validation:
  - `projects/route.js` should validate incoming data more strictly (e.g., check types, string length) before writing to DB.

- Error handling & Logging:
  - Routes return basic JSON on error. Consider centralizing error handling and logging (Sentry or similar) for production.

- Environment and compatibility:
  - `package.json` lists `next` 15.x and `react` 19.x in dependencies. Verify the Node version and Next.js compatibility in your deployment environment. If you run into build/compat issues, try aligning Next and React versions that are known to work together.

- UX:
  - Add an `.env.example` and README run instructions (this file supplements the existing README).
  - Add client-side validation and better feedback for create/update/delete operations.

- Tests:
  - Add at least a few unit/integration tests for the API endpoints (e.g., using Jest + Supertest or Playwright for E2E).

---

## Suggested next steps (small, low-risk improvements)

1. Add `.env.example` showing `MONGODB_URI=`.
2. Replace client-side login logic with a server-side POST `/api/auth/login` that validates password and returns a session cookie or JWT.
3. Hash admin passwords and add a migration or admin creation flow.
4. Add basic tests for `/api/projects` routes.
5. Add `README.md` run section (this file is a complement to the current README).

---

## Where things are located (quick map)

- Pages:
  - `app/page.js` — dashboard list
  - `app/login/page.jsx` — login
  - `app/upload/page.jsx` — upload page
  - `app/dashboard/page.jsx` — dashboard folder exists (component pages inside)

- Models: `models/admin.js`, `models/project.js`
- API routes: `app/api/admin/route.js`, `app/api/projects/route.js`
- DB helper: `utils/dbConnect.js`
- Components: `app/components/*`
- Styles: `app/globals.css`, Tailwind config files
- Public assets: `public/*.jpg`, `.svg` files used by UI

---

Tell me which of the above you'd like next and I'll proceed.
