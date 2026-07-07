"use client";

import { Activity, Users, Scan, Clock, Shield, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const detectionHistory = [
  { id: "DET-001", face: "John Doe", confidence: "98.2%", timestamp: "2 min ago", status: "matched" as const },
  { id: "DET-002", face: "Jane Smith", confidence: "95.7%", timestamp: "5 min ago", status: "matched" as const },
  { id: "DET-003", face: "Unknown", confidence: "72.1%", timestamp: "8 min ago", status: "unmatched" as const },
  { id: "DET-004", face: "Alex Brown", confidence: "99.1%", timestamp: "12 min ago", status: "matched" as const },
  { id: "DET-005", face: "Unknown", confidence: "65.4%", timestamp: "18 min ago", status: "unmatched" as const },
];

export function DetectionAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Detections"
          value="1,284"
          delta="+12.4%"
          up
          icon={<Activity className="h-4 w-4" />}
        />
        <StatCard
          label="Faces Registered"
          value="342"
          delta="+8.2%"
          up
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          label="Match Rate"
          value="94.7%"
          delta="+2.1%"
          up
          icon={<Shield className="h-4 w-4" />}
        />
        <StatCard
          label="Avg Response"
          value="0.34s"
          delta="-0.02s"
          up
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      {/* Detection History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Scan className="h-4 w-4 text-primary" />
            Recent Detections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {detectionHistory.map((det) => (
              <div
                key={det.id}
                className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    det.status === "matched"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}>
                    {det.face.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{det.face}</p>
                    <p className="text-xs text-muted-foreground">{det.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm tabular-nums text-muted-foreground">{det.confidence}</span>
                  <Badge tone={det.status === "matched" ? "success" : "warning"}>
                    {det.status === "matched" ? "Matched" : "Unmatched"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{det.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Alert */}
      <Card className="border-warning/30 bg-warning/5">
        <CardContent className="flex items-start gap-3 p-4">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning">Unrecognized face detected</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              An unknown face was detected at the main entrance 3 minutes ago.
              Review the footage and update the known faces database if needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
