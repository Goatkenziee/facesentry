# BRAIN.md

## What this app does
**FaceSentry** — browser-based AI face detection SaaS. Uses TensorFlow.js + MediaPipe FaceDetector to detect faces from the user's webcam in real time. Everything runs client-side — no server or API key needed.

## Current state
Deployed to GitHub. Vercel deploy blocked by expired integration token (needs reconnect).

## Tech stack and why
- **Next.js 14** (App Router) — best DX for full-stack React apps
- **TypeScript** — type safety for complex detection logic
- **Tailwind CSS** — rapid UI with consistent design tokens
- **TensorFlow.js** — client-side ML (no server needed)
- **@tensorflow-models/face-detection** (MediaPipe) — fast face detection
- **lucide-react** — consistent icon set
- **clsx** — classname utility

## What has been built
- **Camera page** (`/camera`) — live webcam feed with Start/Stop, face detection overlay boxes, status bar (camera, detection, model readiness)
- **Known Faces page** (`/faces`) — manage known face profiles (name, image, notes, tags)
- **Detection Log page** (`/logs`) — searchable, filterable table of detection events (face name, confidence, timestamp, location)
- **Settings page** (`/settings`) — camera config (resolution, FPS, sensitivity), notifications toggle, data retention
- **Home page** (`/`) — overview dashboard with stat cards (detections today, faces tracked, cameras online, accuracy)
- **Components library**: AppShell, Container, PageHeader, Button, Card, Badge, Input, Table, Tabs, Dialog, Toast, Skeleton, Spinner, EmptyState, ErrorState, Loading, CommandPalette, StatCard
- **Camera hook** (`use-camera`) — manages MediaStream lifecycle, lazy-loads TensorFlow + MediaPipe, runs detection every 1.5s
- **Auth form** (`auth-form.tsx`) — sign-in/sign-up UI (UI only, no backend)

## Verified fixes this run
- ✅ Fixed `package.json` dependency conflict — pinned all `@tensorflow/tfjs-*` to 4.22.0 (matching peer dep requirement)
- ✅ Added full CSS custom properties (design tokens) to `globals.css` — was missing `:root` vars, causing unrendered UI
- ✅ Added missing config files (tsconfig, tailwind, postcss, next.config, .gitignore) to repo
- ✅ All 41 source files pushed to GitHub `main` branch

## Latest verification
- [✅] GitHub: All files pushed to Goatkenziee/facesentry@main
- [❌] Vercel: Deploy blocked — VERCEL_USER_TOKEN_INVALID (expired integration)
- [⚠️] Local build: Needs `npm install --legacy-peer-deps` then `npm run dev`

## What's still pending
1. **Reconnect Vercel** — Go to Settings → Integrations → Vercel → Reconnect, then I can deploy
2. **Install deps locally** — `npm install --legacy-peer-deps` (needed for TensorFlow peer dep resolution)
3. **Build verification** — `npm run build` to confirm no TS errors

## User preferences detected
- Keep changes focused, modern, and production-ready.
- Use client-side AI (no server costs).

## Run notes
- Last updated: 2026-07-07
- Run count: 5
- GitHub: https://github.com/Goatkenziee/facesentry
