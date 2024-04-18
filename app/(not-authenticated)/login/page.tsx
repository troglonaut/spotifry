"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000" });
  };

  return <button onClick={handleLogin}>Login</button>;
}
