import { AuthSession, AuthUser, Profile } from "@/types/types";
import { customFetch } from "@/app/utils/serverUtils";

export const SPOTIFY_URL_BASE = "https://api.spotify.com";

// USERS ACTIONS
export const getCurrentUserProfile = async (
  session: AuthSession
): Promise<Profile> => customFetch(`${SPOTIFY_URL_BASE}/v1/me`, session);

/**
 * @description get user's top ARTISTS or TRACKS
 */
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
}) => customFetch(`${SPOTIFY_URL_BASE}/v1/me/top/${type}`, session);

export const getUserById = async ({
  session,
  id,
}: {
  session: AuthSession;
  id: string;
}): Promise<Profile> =>
  customFetch(`${SPOTIFY_URL_BASE}/v1/users/${id}`, session);

export async function refreshAccessToken(
  accessToken: string,
  refreshToken: string
) {
  return await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      client_id: "none",
    }),
  }).then((res) => res.json());
}
