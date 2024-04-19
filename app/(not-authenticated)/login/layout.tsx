// "use client";

import "@/app/globals.css";
import { NextAuthProvider } from "@/app/providers/NextAuthProvider";
import { Montserrat } from "next/font/google";

const fontFamily = Montserrat({ subsets: ["latin"] });

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={fontFamily.className + " text-white bg-paper-700"}>
          <main>{children}</main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
