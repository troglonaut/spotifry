"use client";

import { getToken } from "@/app/lib/actions";
import { Button, Sheet } from "@mui/joy";
import { useParams } from "next/navigation";

export default function LoginForm() {
  const params = useParams();
  const code = params.code;
  // const params = useParams<{client_secret: windo}>
  function handleClick() {
    getToken(code);
  }

  return (
    <main>
      <Sheet
        className="mx-auto my-48 w-96 py-3 px-2 flex flex-col gap-2 border rounded-sm"
        variant="outlined"
      >
        <h1>Howdy!</h1>
        <form>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            className="w-full"
            type="email"
            id="email"
            placeholder="Email address"
          />
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            className="w-full"
            type="password"
            id="password"
            placeholder="Password"
          />
        </form>
        <Button onClick={handleClick}>Login</Button>
      </Sheet>
    </main>
  );
}
