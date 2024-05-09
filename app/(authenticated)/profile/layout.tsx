"use client";

import { useSession } from "next-auth/react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  console.info(`%c🔬 session`, "color: limegreen; font-size: 20px;", session);
  return <>{children}</>;
}
