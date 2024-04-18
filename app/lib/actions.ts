import { AuthSession } from "@/types/types";

export const SPOTIFY_URL_BASE = "https://api.spotify.com";

// USERS ACTIONS
export const getCurrentUserProfile = async (session: AuthSession) => {
  return await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());
};
