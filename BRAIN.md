# BRAIN.md

## What this app does
FaceSentry — A real-time camera detection SaaS app with face detection, analytics dashboard, security alerts, and a polished dark-theme UI.

## Current state
✅ **VERIFICATION FIX PASS 1/3 COMPLETE** — Production build now passes cleanly.

## Tech stack
- **Framework**: Next.js 14.2.21 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with dark theme design tokens
- **UI**: Custom component library (Button, Card, Dialog, Tabs, Toast, etc.)
- **Camera**: Browser `getUserMedia` API with simulated face detection

## What has been built
- `app/` — App Router pages (layout, home page, _document, not-found)
- `components/features/` — CameraFeed, DetectionAnalytics, FaceDetectionOverlay
- `components/layout/` — AppShell, Container, PageHeader
- `components/ui/` — Design system primitives (Button, Card, Input, Table, Dialog, Tabs, Toast, Badge, StatCard, Skeleton, Spinner)
- `components/states/` — EmptyState, ErrorState, Loading
- `features/auth/` — Auth form component
- `hooks/` — useCamera hook (webcam + simulated face detection)
- `lib/` — Utility functions (cn, formatters)

## Latest verification
- ✅ Production build: Compiles successfully, all pages generated (4/4 static pages)
- ✅ TypeScript: No errors
- ✅ Preview: Dev server serves on port 3000

## Fixed issues
1. **`/_document` build crash** — Removed empty `pages/` directory that was confusing Next.js 14 App Router. The `app/_document.tsx` file was already correct; the empty Pages Router directory was causing a PageNotFoundError during the build's "Collecting page data" phase.

## What's still pending
- VERIFICATION FIX PASS 2/3 — Additional sandbox checks
- VERIFICATION FIX PASS 3/3 — Final verification pass
- Deploy to production (Vercel)

## User preferences
- Dark theme, enterprise-grade UI
- Real-time camera feed with face detection
- Keep changes focused, modern, and production-ready

## Run notes
- Last updated: 2026-07-07T16:07:05.552Z
- Autonomous iteration: 0
