"use client";

import { Camera, CameraOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import type { CameraState } from "@/hooks/use-camera";
import { FaceDetectionOverlay } from "./face-detection-overlay";

interface CameraFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraState: CameraState;
  onStart: () => void;
  onStop: () => void;
  onCapture: () => string | null;
}

export function CameraFeed({ videoRef, canvasRef, cameraState, onStart, onStop }: CameraFeedProps) {
  const { isActive, error, faceDetected, faceCount } = cameraState;

  return (
    <Card className="overflow-hidden border-border/50">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg">Live Camera Feed</CardTitle>
          {isActive && (
            <Badge tone="success" className="animate-pulse-scan gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" />
              LIVE
            </Badge>
          )}
          {!isActive && !error && (
            <Badge tone="outline">Offline</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <Button variant="destructive" size="sm" onClick={onStop}>
              <CameraOff className="mr-1.5 h-4 w-4" />
              Stop
            </Button>
          ) : (
            <Button size="sm" onClick={onStart} disabled={!!error}>
              <Camera className="mr-1.5 h-4 w-4" />
              Start Camera
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="flex flex-col items-center gap-3 p-8 text-center">
              <CameraOff className="h-12 w-12 text-destructive/60" />
              <p className="text-sm text-muted-foreground max-w-xs">{error}</p>
              <Button variant="outline" size="sm" onClick={onStart}>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Retry
              </Button>
            </div>
          ) : isActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              <FaceDetectionOverlay
                isDetecting={faceDetected}
                faceCount={faceCount}
              />
              {/* Hidden canvas for frame capture */}
              <canvas ref={canvasRef} className="hidden" />
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 p-8 text-center">
              <Camera className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Click <span className="font-medium text-foreground">Start Camera</span> to begin face detection
              </p>
            </div>
          )}
        </div>

        {/* Status bar */}
        {isActive && (
          <div className="flex items-center gap-4 border-t border-border/50 px-4 py-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Camera active
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${faceDetected ? "bg-success" : "bg-muted-foreground/30"}`} />
              {faceDetected ? `${faceCount} face(s) detected` : "No face detected"}
            </div>
            <div className="ml-auto">640 × 480</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
