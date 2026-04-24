"use client";

import { useSyncExternalStore } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnly({
  children,
  fallback = null,
}: ClientOnlyProps) {
  const isClient = useSyncExternalStore(
    () => () => {}, // No subscription needed
    () => true, // Value on client
    () => false, // Value on server
  );

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
