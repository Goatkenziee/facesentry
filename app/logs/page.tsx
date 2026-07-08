"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Users, ScrollText, Settings, Search, Download } from "lucide-react";

const nav = [
  { label: "Camera Feed", href: "/camera", icon: <Camera className="h-4 w-4" /> },
  { label: "Known Faces", href: "/faces", icon: <Users className="h-4 w-4" /> },
  { label: "Detection Log", href: "/logs", icon: <ScrollText className="h-4 w-4" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

interface DetectionEvent {
  id: string;
  timestamp: string;
  facesDetected: number;
  confidence: number;
  type: "single" | "multiple" | "unknown";
}

const MOCK_LOG: DetectionEvent[] = Array.from({ length: 20 }, (_, i) => ({
  id: `evt-${i}`,
  timestamp: new Date(Date.now() - i * 30000).toISOString(),
  facesDetected: Math.floor(Math.random() * 3) + 1,
  confidence: Math.round((0.7 + Math.random() * 0.3) * 100) / 100,
  type: (["single", "multiple", "unknown"] as const)[
    Math.floor(Math.random() * 3)
  ],
}));

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [events] = useState(MOCK_LOG);

  const filtered = events.filter((e) =>
    e.type.includes(search.toLowerCase())
  );

  return (
    <AppShell nav={nav} brand="FaceSentry" active="/logs">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Detection Log</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Chronological record of all face detection events.
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-1.5 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {filtered.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between px-6 py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      tone={
                        event.type === "single"
                          ? "success"
                          : event.type === "multiple"
                            ? "warning"
                            : "outline"
                      }
                    >
                      {event.type}
                    </Badge>
                    <span className="font-medium">
                      {event.facesDetected} face{event.facesDetected !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{(event.confidence * 100).toFixed(0)}% confidence</span>
                    <span>
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
