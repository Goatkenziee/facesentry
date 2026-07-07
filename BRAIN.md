# BRAIN.md

## What this app does
Camera Detection & Facial Recognition SaaS — a full Next.js app with live camera capture, face detection using TensorFlow.js (face-landmarks-detection + mediapipe), and a professional SaaS dashboard.

## Tech stack and why
- **Next.js 14 (App Router)** — React framework for SSR/SPA hybrid
- **TypeScript** — type safety
- **Tailwind CSS** — utility-first styling
- **TensorFlow.js + face-landmarks-detection** — runs face detection entirely client-side, no server needed
- **Lucide React** — icon library
- **Inter font** — clean typography

## What has been built
- `app/page.tsx` — Main dashboard with camera capture, face detection, stats, and customer table
- `components/features/camera-detector.tsx` — Core camera component with TensorFlow.js face detection, landmarks overlay, detection stats
- `components/ui/*` — Full design system (Button, Card, Badge, Table, Tabs, Dialog, Input, Skeleton, Spinner, StatCard, Toast, CommandPalette)
- `components/layout/*` — AppShell, Container, PageHeader
- `components/states/*` — Loading, Empty, Error state components
- `features/auth/auth-form.tsx` — Auth form component
- `lib/utils.ts` — Utility functions (cn, formatters)
- `app/globals.css` — Design tokens and animations

## Latest verification
- ✅ Preview verified: renders without runtime errors
- ✅ TensorFlow.js face detection loads and runs in browser
- ✅ Camera permissions and capture flow working
- ✅ Build compiles with 0 errors

## What's still pending
- Deploy to Vercel for live URL
- Push to GitHub for source control

## User preferences detected
- Keep changes focused, modern, and production-ready.

## Run notes
- Last updated: 2026-07-07T15:40:00.000Z
- Autonomous iteration: 1
