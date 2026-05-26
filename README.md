# InterviewWala — Frontend

Production-grade SaaS frontend for an AI-powered career intelligence platform. Built with Next.js 15, TypeScript, Tailwind, Framer Motion, TanStack Query, and Zustand. Frontend only — mocked data.

## Stack

- **Next.js 15** App Router · React 19
- **TypeScript** strict
- **Tailwind CSS** + shadcn-style primitives
- **Framer Motion** for subtle motion
- **Recharts** for analytics
- **@hello-pangea/dnd** for the kanban board
- **TanStack Query** + **Zustand** for data/state
- **next-themes** for dark mode

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Path | Description |
| --- | --- |
| `/` | Landing page (hero, metrics, product, intelligence, extension, workflow, testimonials, CTA) |
| `/sign-in`, `/sign-up` | Authentication screens |
| `/dashboard` | KPI cards, velocity chart, recent applications, activity, follow-ups |
| `/applications` | Drag-and-drop kanban (Applied → OA → Interview → Offer / Rejected) |
| `/resume` | Resume intelligence — ATS, callback rate, per-version performance |
| `/analytics` | Funnel, trends, domain & company conversion |
| `/recruiters` | CRM with conversation thread |
| `/settings` | Profile, preferences, integrations |

## Architecture

```
app/                    # Next.js App Router (landing, auth, dashboard shell)
components/
  layout/               # Sidebar, topbar, logo
  ui/                   # shadcn-style primitives (Button, Card, Tabs, …)
features/
  landing/              # Landing-page sections
  dashboard/            # Stat cards, velocity chart
  applications/         # Kanban board
  resume/               # Resume performance chart
  analytics/            # Recharts visualizations
hooks/                  # (extend here)
lib/                    # utils, mock-data
store/                  # Zustand stores
types/                  # Shared types
```

## Design

Inspired by Linear, Stripe Dashboard, Vercel, and Notion. Grayscale palette with a single foreground accent, generous whitespace, subtle motion, no gradient or icon clutter.

## Notes

This is a **frontend-only** project. All data is statically mocked in `lib/mock-data.ts`. Wire your backend by replacing those exports and the Zustand seed.
