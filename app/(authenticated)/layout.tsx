"use client";

import "@/app/globals.css";
import { NextAuthProvider } from "@/app/providers/NextAuthProvider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <SessionProvider>
        <html lang="en">
          <body>
            <main>{children}</main>
          </body>
        </html>
      </SessionProvider>
    </NextAuthProvider>
  );
}
