import "@/app/globals.css";
import { NextAuthProvider } from "@/app/providers/NextAuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </NextAuthProvider>
  );
}
