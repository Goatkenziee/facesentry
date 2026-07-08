"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Users, ScrollText, Settings, Save, RotateCcw } from "lucide-react";

const nav = [
  { label: "Camera Feed", href: "/camera", icon: <Camera className="h-4 w-4" /> },
  { label: "Known Faces", href: "/faces", icon: <Users className="h-4 w-4" /> },
  { label: "Detection Log", href: "/logs", icon: <ScrollText className="h-4 w-4" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function SettingsPage() {
  const [confidence, setConfidence] = useState("0.7");
  const [interval, setInterval] = useState("1500");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell nav={nav} brand="FaceSentry" active="/settings">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure detection parameters and preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detection Settings</CardTitle>
            <CardDescription>
              Adjust how the AI model detects faces in the camera feed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Minimum Confidence Threshold
              </label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={confidence}
                  onChange={(e) => setConfidence(e.target.value)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">
                  Lower values detect more faces but may include false positives
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Detection Interval (ms)
              </label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min="500"
                  max="5000"
                  step="100"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">
                  How often the AI checks for faces (500ms - 5000ms)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleSave}>
                <Save className="mr-1.5 h-4 w-4" />
                {saved ? "Saved!" : "Save Settings"}
              </Button>
              <Button variant="outline">
                <RotateCcw className="mr-1.5 h-4 w-4" />
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>
              FaceSentry v0.1.0 — AI-powered face detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              This application uses TensorFlow.js with the MediaPipe Face Detector model
              to perform real-time face detection entirely in your browser.
            </p>
            <p>
              No images or video data are ever uploaded to a server — all processing
              happens locally on your device.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
