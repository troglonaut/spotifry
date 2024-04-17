import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/(ui)/globals.css";
import { CssBaseline } from "@mui/joy";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotifry",
  description: "A heaping portion of Spotify, fried.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CssBaseline />
      {/* <CssVarsProvider> */}
      <html lang="en">
        <CssBaseline />
        {/* <CssVarsProvider> */}
        <body className={inter.className}>{children}</body>
        {/* </CssVarsProvider> */}
      </html>
      {/* </CssVarsProvider> */}
    </>
  );
}
