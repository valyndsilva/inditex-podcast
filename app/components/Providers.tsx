"use client";
import { PodcastProvider } from "@/context/podcastContext";
import React, { useEffect, useState } from "react";
export default function Providers({ children }: { children: React.ReactNode }) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <PodcastProvider> {children}</PodcastProvider>
    </>
  );
}
