"use client";

import { Camera, LayoutDashboard, Users, Settings, Scan, Shield, Activity } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { CameraFeed } from "@/components/features/camera-feed";
import { DetectionAnalytics } from "@/components/features/detection-analytics";
import { useCamera } from "@/hooks/use-camera";

const nav = [
  { label: "Dashboard", href: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Camera Feed", href: "/camera", icon: <Camera className="h-4 w-4" /> },
  { label: "Known Faces", href: "/faces", icon: <Users className="h-4 w-4" /> },
  { label: "Detection Log", href: "/logs", icon: <Activity className="h-4 w-4" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function Home() {
  const { videoRef, canvasRef, state, startCamera, stopCamera, captureFrame } = useCamera();

  return (
    <AppShell brand={
      <span className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span>FaceSentry</span>
      </span>
    } active="/" nav={nav}>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Real-time face recognition monitoring and analytics."
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Scan className="mr-1.5 h-4 w-4" />
                Export Report
              </Button>
              <Button size="sm">
                <Shield className="mr-1.5 h-4 w-4" />
                New Detection
              </Button>
            </div>
          }
        />

        {/* Camera + Analytics grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CameraFeed
            videoRef={videoRef}
            canvasRef={canvasRef}
            cameraState={state}
            onStart={startCamera}
            onStop={stopCamera}
            onCapture={captureFrame}
          />
          <DetectionAnalytics />
        </div>

        {/* System Status */}
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse-scan" />
                <span className="text-sm font-medium">System Online</span>
              </div>
              <span className="text-xs text-muted-foreground">Model v2.4.1 · 98.7% uptime</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>API: <span className="text-success">Healthy</span></span>
              <span>Database: <span className="text-success">Connected</span></span>
              <span>Queue: <span className="text-success">Idle</span></span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
