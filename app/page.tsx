"use client";

import { Camera, Users, ScrollText, Settings, Shield, Activity, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between border-b border-border/50 px-6 py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">FaceSentry</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/camera">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/camera">
            <Button size="sm">
              Get Started
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
        <Badge tone="primary" className="mb-6">
          <Zap className="mr-1 h-3 w-3" />
          Powered by TensorFlow.js
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Real-Time AI{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Face Detection
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Enterprise-grade facial recognition that runs entirely in your browser.
          No server uploads, no privacy concerns — just instant AI-powered detection.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/camera">
            <Button size="lg" className="gap-2">
              <Camera className="h-5 w-5" />
              Open Camera Feed
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" size="lg">
              <Settings className="mr-2 h-5 w-5" />
              Configure
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
            <Camera className="mb-4 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Live Camera Detection</h3>
            <p className="text-sm text-muted-foreground">
              Real-time face detection from your webcam. Detects multiple faces simultaneously with confidence scoring.
            </p>
          </div>
          <div className="group rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
            <Activity className="mb-4 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Detection Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Track detection frequency, face counts, and session statistics with real-time charts.
            </p>
          </div>
          <div className="group rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
            <Users className="mb-4 h-8 w-8 text-primary" />
            <h3 className="mb-2 font-semibold">Known Faces Library</h3>
            <p className="text-sm text-muted-foreground">
              Save and manage recognized faces. Build a gallery of known identities for quick matching.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 px-6 py-6 text-center text-sm text-muted-foreground">
        FaceSentry — AI-powered face detection. All processing happens locally in your browser.
      </footer>
    </div>
  );
}
