"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({ icon, label, value, description, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border/50 bg-card p-4", className)}>
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
