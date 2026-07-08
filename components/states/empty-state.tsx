"use client";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 p-12 text-center", className)}>
      <div className="mb-4 text-muted-foreground/40">{icon}</div>
      <h3 className="mb-1 text-sm font-medium">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-xs">{description}</p>
      {action}
    </div>
  );
}
