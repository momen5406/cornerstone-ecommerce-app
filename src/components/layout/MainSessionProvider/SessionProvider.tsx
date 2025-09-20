"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const MainSessionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default MainSessionProvider;
