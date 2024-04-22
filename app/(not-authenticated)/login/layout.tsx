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
    <NextAuthProvider>
      <html lang="en">
        <body className={fontFamily.className + " text-white"}>
          <main>{children}</main>
        </body>
      </html>
    </NextAuthProvider>
  );
}
