"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";
import NexusBackground from "@/components/NexusBackground";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ThemeProvider>
        <NexusBackground />
        <Cursor />
        <PageTransition>{children}</PageTransition>
      </ThemeProvider>
  );
}