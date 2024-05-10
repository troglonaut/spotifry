"use client";

import "@/app/globals.css";
import { NextAuthProvider } from "@/app/providers/NextAuthProvider";
import { SessionProvider } from "next-auth/react";
import TheAppBar from "./the-app-bar";

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
            <TheAppBar />
            <main>{children}</main>
          </body>
        </html>
      </SessionProvider>
    </NextAuthProvider>
  );
}
