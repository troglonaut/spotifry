import { ArtistObject, AuthSession, Profile } from "@/types/types";
import { customFetch } from "@/app/utils/serverUtils";

export const SPOTIFY_URL_BASE = "https://api.spotify.com";

export const getMyProfile = async (session: AuthSession): Promise<Profile> =>
  customFetch(`${SPOTIFY_URL_BASE}/v1/me`, session);

export const getFollowedArtists = async ({
  session,
  after,
  limit,
}: {
  session: AuthSession;
  after?: string;
  limit?: number;
}): Promise<ArtistObject[]> => {
  const searchParams = new URLSearchParams({ type: "artist" });

  if (after) searchParams.set("after", after);
  if (limit) searchParams.set("limit", limit.toString());

  return customFetch(
    `https://api.spotify.com/v1/me/following?type=artist`,
    session,
    searchParams
  );
};

export const getFeaturedPlaylists = async (
  session: AuthSession,
  locale = "en_US",
  limit?: number,
  offset?: number
) => {
  const searchParams = new URLSearchParams({ locale });
  if (limit) searchParams.set("limit", limit.toString());
  if (offset) searchParams.set("offset", offset.toString());
  return customFetch(
    `${SPOTIFY_URL_BASE}/v1/browse/featured-playlists`,
    session
  );
};

export const getMyPlaylists = async (
  session: AuthSession,
  limit?: number,
  offset?: number
) => {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set("limit", limit.toString());
  if (offset) searchParams.set("offset", offset.toString());
  return customFetch(
    `${SPOTIFY_URL_BASE}/v1/me/playlists`,
    session,
    searchParams
  );
};

export const getMySavedTracks = async (
  session: AuthSession,
  limit = 20,
  market?: string,
  offset?: number
) => {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set("limit", limit.toString());
  if (offset) searchParams.set("offset", offset.toString());
  if (market) searchParams.set("market", market);
  return customFetch(`${SPOTIFY_URL_BASE}/v1/me/tracks`, session);
};

/**
 * @description get user's top ARTISTS or TRACKS
 */
export const getMyTopItems = async ({
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

// export async function refreshAccessToken(
//   accessToken: string,
//   refreshToken: string
// ) {
//   return await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({
//       refresh_token: refreshToken,
//       grant_type: "refresh_token",
//       client_id: "none",
//     }),
//   }).then((res) => res.json());
// }
