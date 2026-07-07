# BRAIN.md

## What this app does
**FaceSentry** — AI-powered face recognition & camera detection SaaS platform. Real-time webcam feed with face detection, detection analytics dashboard, and identity monitoring.

## Current state
✅ **Build passes.** Both build errors fixed:
1. Removed `.next/types/**/*.ts` from tsconfig `include` (caused TS errors before first build)
2. Upgraded Next.js from 14.2.15 → 14.2.21 (fixes App Router `_document` page-not-found bug)

## Tech stack and why
- **Next.js 14.2.21** (App Router) — React framework with file-based routing
- **TypeScript** — type safety
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Framer Motion** — animations for detection overlays
- **Lucide React** — icon library
- **clsx + tailwind-merge** — className utilities

## What has been built
- **37 files** across the full SaaS scaffold
- **Camera feed** — live webcam with start/stop controls, permission handling, error states
- **Face detection overlay** — visual bounding box animation when faces detected
- **Detection analytics** — dashboard with stat cards showing detection metrics
- **Auth form** — sign-in/sign-up UI with email + password
- **UI library** — Button, Card, Badge, Input, Dialog, Tabs, Table, Toast, Skeleton, Spinner, StatCard
- **Layout** — AppShell with sidebar nav, PageHeader, Container
- **States** — Empty, Error, Loading components for every data region
- **Camera hook** — useCamera with stream management, frame capture, simulated face detection

## Latest verification
✅ **Build**: `npm run build` passes clean (Next.js 14.2.21)
✅ **TypeScript**: compiles without errors
✅ **Static pages**: 4/4 generated (/, /_not-found, + shared chunks)

## What's still pending
- Deploy to Vercel (token needs reconnecting in Settings → Integrations)
- Replace simulated face detection with real ML (TensorFlow.js / face-api.js)
- Add API routes for backend analytics persistence
- Add user authentication (Supabase/Clerk)
- Add real-time detection logging

## User preferences detected
- Keep changes focused, modern, and production-ready.
- Camera detection + facial recognition SaaS with real-time webcam feed.

## Run notes
- Last updated: 2026-07-07T15:59:00.000Z
- Autonomous iteration: 1
- Repo: https://github.com/Goatkenziee/facesentry
