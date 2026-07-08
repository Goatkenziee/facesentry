"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Camera, Eye } from "lucide-react";
import type { FaceBox } from "@/hooks/use-camera";

interface DetectionAnalyticsProps {
  faceDetected: boolean;
  faceCount: number;
  isActive: boolean;
  faces: FaceBox[];
}

export function DetectionAnalytics({ faceDetected, faceCount, isActive, faces }: DetectionAnalyticsProps) {
  const avgConfidence =
    faces.length > 0
      ? faces.reduce((sum, f) => sum + f.confidence, 0) / faces.length
      : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Detection Analytics</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Camera className="h-4 w-4" />}
          label="Camera Status"
          value={
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  isActive ? "bg-success animate-pulse" : "bg-muted-foreground/50"
                }`}
              />
              {isActive ? "Active" : "Inactive"}
            </div>
          }
        />
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="Faces Detected"
          value={faceDetected ? faceCount : 0}
          description={faceDetected ? "Currently in frame" : "No faces"}
        />
        <StatCard
          icon={<Activity className="h-4 w-4" />}
          label="Detection Status"
          value={
            <Badge
              tone={faceDetected ? "success" : "outline"}
              className="text-xs"
            >
              {faceDetected ? "Detecting" : "Idle"}
            </Badge>
          }
        />
        <StatCard
          icon={<Eye className="h-4 w-4" />}
          label="Avg Confidence"
          value={
            faces.length > 0
              ? `${(avgConfidence * 100).toFixed(0)}%`
              : "—"
          }
          description={faces.length > 0 ? "Across all faces" : "No data"}
        />
      </div>
    </div>
  );
}
