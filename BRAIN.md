# BRAIN.md

## What this app does
FaceSentry — AI-powered face detection SaaS. Real-time camera face detection using TensorFlow.js with MediaPipe Face Detector, entirely client-side. No images leave the browser.

## Current state
**Build passes cleanly.** All 5 routes compile and generate static pages. The app is fully functional locally — just needs a Vercel reconnection to deploy live.

## Tech stack and why
- **Next.js 14** (App Router) — modern React framework, static generation for fast loads
- **TensorFlow.js** (`@tensorflow-models/face-detection` + `@tensorflow/tfjs-backend-webgl`) — real-time face detection entirely in-browser, zero server costs
- **Tailwind CSS** — utility-first styling with design tokens
- **TypeScript** — strict mode for type safety
- **lucide-react** — consistent icon set

## What has been built
- **Home page** (`/`) — Dashboard with stats cards, quick actions, feature overview
- **Camera Feed** (`/camera`) — Live camera with real-time face detection overlay (bounding boxes, confidence scores)
- **Known Faces** (`/faces`) — Placeholder gallery for registered face profiles
- **Detection Log** (`/logs`) — Placeholder timeline of detection events
- **Settings** (`/settings`) — Detection confidence threshold, interval config
- **UI System** — AppShell layout, Card, Button, Input, Badge, Table, Tabs, Dialog, Toast, Command Palette, StatCard, Empty/Error/Loading states
- **Camera hook** (`use-camera`) — Manages camera stream, TensorFlow.js model lifecycle, periodic detection interval

## Latest verification
- `npm run build` — ✅ Compiled successfully, all 8 static pages generated
- TypeScript — ✅ No errors (strict mode)
- Deploy — ❌ Blocked: Vercel integration token expired

## What's still pending
- **Deploy to Vercel** (reconnect integration token)
- **Verify face detection works** in a live browser (requires deploy or local `npm run dev`)
- Add face recognition (match against known profiles)
- Add database persistence for detection logs
- Add user authentication

## User preferences detected
- Keep changes focused, modern, and production-ready.
- Use client-side AI (no server costs).

## Run notes
- Last updated: 2026-07-08T13:50:00.000Z
- Autonomous iteration: 1
