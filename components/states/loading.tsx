"use client";

import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Spinner className="mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
