"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function Login() {
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000" });
  };

  return <Button onClick={handleLogin}>Login</Button>;
}
