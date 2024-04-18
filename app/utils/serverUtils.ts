import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthSession } from "@/types/types";
import { getServerSession } from "next-auth/next";

export const getAuthSession = async () => {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return null;
  }

  const currentTimestamp = Math.floor(Date.now());
  if (currentTimestamp >= session.user.expires_at * 1000) {
    return null;
  }

  return session;
};
