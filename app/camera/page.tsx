"use client";

import { useCamera } from "@/hooks/use-camera";
import { CameraFeed } from "@/components/features/camera-feed";
import { DetectionAnalytics } from "@/components/features/detection-analytics";
import { AppShell } from "@/components/layout/app-shell";
import { Camera, Users, ScrollText, Settings } from "lucide-react";

const nav = [
  { label: "Camera Feed", href: "/camera", icon: <Camera className="h-4 w-4" /> },
  { label: "Known Faces", href: "/faces", icon: <Users className="h-4 w-4" /> },
  { label: "Detection Log", href: "/logs", icon: <ScrollText className="h-4 w-4" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function CameraPage() {
  const { videoRef, canvasRef, state, startCamera, stopCamera, captureFrame } = useCamera();

  return (
    <AppShell nav={nav} brand="FaceSentry" active="/camera">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Camera Feed</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time AI face detection powered by TensorFlow.js — runs entirely in your browser.
          </p>
        </div>

        <CameraFeed
          videoRef={videoRef}
          canvasRef={canvasRef}
          cameraState={state}
          onStart={startCamera}
          onStop={stopCamera}
          onCapture={captureFrame}
        />

        <DetectionAnalytics
          faceDetected={state.faceDetected}
          faceCount={state.faceCount}
          isActive={state.isActive}
          faces={state.faces}
        />
      </div>
    </AppShell>
  );
}
