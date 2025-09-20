"use client";
import Logo from "@/components/ui/Logo";
import { Loader2 } from "lucide-react";
import React from "react";

const MainLoading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Logo / App Name */}
      <h1 className="text-2xl mb-6 animate-pulse">
        <Logo />
      </h1>

      {/* Loader */}
      <Loader2 className="animate-spin" />

      {/* Loading text */}
      <p className="mt-6 text-neutral-600 dark:text-neutral-400 text-sm animate-bounce">
        Preparing your experience...
      </p>
    </div>
  );
};

export default MainLoading;
