import "@/app/globals.css";
import { NextAuthProvider } from "@/app/providers/NextAuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body>
          <main className="mx-8 my-4">{children}</main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
