import { AuthSession, User } from "@/types/types";

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
