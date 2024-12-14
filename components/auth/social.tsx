"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex gap-4">
      <Button onClick={() => onClick("google")}>Login with Google</Button>
      <Button onClick={() => onClick("github")}>Login with Github</Button>
    </div>
  );
};

export default Social;
