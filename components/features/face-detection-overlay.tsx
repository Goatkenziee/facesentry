"use client";

import { Scan, UserCheck, Users } from "lucide-react";

interface FaceDetectionOverlayProps {
  isDetecting: boolean;
  faceCount: number;
}

export function FaceDetectionOverlay({ isDetecting, faceCount }: FaceDetectionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scanning frame */}
      <div className="absolute inset-[15%] border-2 border-primary/40 rounded-xl">
        {/* Corner brackets */}
        <div className="absolute -top-0.5 -left-0.5 h-6 w-6 border-t-2 border-l-2 border-primary rounded-tl" />
        <div className="absolute -top-0.5 -right-0.5 h-6 w-6 border-t-2 border-r-2 border-primary rounded-tr" />
        <div className="absolute -bottom-0.5 -left-0.5 h-6 w-6 border-b-2 border-l-2 border-primary rounded-bl" />
        <div className="absolute -bottom-0.5 -right-0.5 h-6 w-6 border-b-2 border-r-2 border-primary rounded-br" />

        {/* Scanning line */}
        <div className="absolute left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_hsl(var(--primary)/0.6)] animate-scan-line" />
      </div>

      {/* Detection status badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        {isDetecting ? (
          <div className="flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-primary border border-primary/30">
            <UserCheck className="h-3.5 w-3.5" />
            {faceCount} face{faceCount !== 1 ? "s" : ""} detected
            <Users className="h-3.5 w-3.5 ml-1" />
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-background/60 backdrop-blur-sm px-3 py-1.5 text-xs text-muted-foreground border border-border/50">
            <Scan className="h-3.5 w-3.5 animate-pulse-scan" />
            Scanning for faces...
          </div>
        )}
      </div>
    </div>
  );
}
