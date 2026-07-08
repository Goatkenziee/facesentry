"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/states/empty-state";
import { Camera, Users, ScrollText, Settings, UserPlus, Search, Trash2 } from "lucide-react";

const nav = [
  { label: "Camera Feed", href: "/camera", icon: <Camera className="h-4 w-4" /> },
  { label: "Known Faces", href: "/faces", icon: <Users className="h-4 w-4" /> },
  { label: "Detection Log", href: "/logs", icon: <ScrollText className="h-4 w-4" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

interface KnownFace {
  id: string;
  name: string;
  addedAt: string;
  imageCount: number;
}

const MOCK_FACES: KnownFace[] = [
  { id: "1", name: "Alex Chen", addedAt: "2024-12-01", imageCount: 12 },
  { id: "2", name: "Sarah Johnson", addedAt: "2024-11-28", imageCount: 8 },
  { id: "3", name: "Marcus Williams", addedAt: "2024-11-25", imageCount: 5 },
];

export default function FacesPage() {
  const [search, setSearch] = useState("");
  const [faces] = useState<KnownFace[]>(MOCK_FACES);

  const filtered = faces.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell nav={nav} brand="FaceSentry" active="/faces">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Known Faces</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage recognized faces and identities.
            </p>
          </div>
          <Button>
            <UserPlus className="mr-1.5 h-4 w-4" />
            Add Face
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search faces..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            title="No faces found"
            description="Add a face from the camera feed or adjust your search."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((face) => (
              <Card key={face.id} className="group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{face.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge tone="outline">{face.imageCount} images</Badge>
                    <span>Added {face.addedAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
