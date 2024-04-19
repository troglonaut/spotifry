import { AuthSession, User } from "@/types/types";
import { customFetch } from "../utils/serverUtils";

export const SPOTIFY_URL_BASE = "https://api.spotify.com/v1";

// USERS ACTIONS
export const getCurrentUserProfile = async (
  session: AuthSession
): Promise<User> => {
  return await fetch(`${SPOTIFY_URL_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());
};

export const getUsersTopItems = async ({
  type,
  session,
  time_range,
  limit,
  offset,
}: {
  type: "artists" | "tracks";
  session: AuthSession;
  time_range?: string;
  limit?: number;
  offset?: number;
}) => customFetch(`${SPOTIFY_URL_BASE}/me/top/${type}`, session);
