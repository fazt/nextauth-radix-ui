"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

function GlobalContext({ children }: Props) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}

export default GlobalContext;
