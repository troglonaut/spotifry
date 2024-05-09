import {
  ArtistObject,
  AuthSession,
  GetMyPlaylistsResponse,
  Profile,
} from "@/types/types";
import { customFetch } from "@/app/utils/serverUtils";

export const SPOTIFY_URL_BASE = "https://api.spotify.com";
export const V1_BASE = `${SPOTIFY_URL_BASE}/v1`;

export const getMyProfile = async (session: AuthSession): Promise<Profile> =>
  customFetch(`${V1_BASE}/me`, session);

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

  return customFetch(`${V1_BASE}/me/following`, session, searchParams);
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
): Promise<GetMyPlaylistsResponse> => {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set("limit", limit.toString());
  if (offset) searchParams.set("offset", offset.toString());
  return customFetch(`${V1_BASE}/me/playlists`, session, searchParams);
};

export const getMySavedAlbums = async (
  session: AuthSession,
  limit = 20,
  offset?: number,
  market?: string
) => await getMySavedItems(session, "albums", limit, offset, market);

export const getMySavedAudiobooks = async (
  session: AuthSession,
  limit = 20,
  offset?: number
) => await getMySavedItems(session, "audiobooks", limit, offset);

export const getMySavedEpisodes = async (
  session: AuthSession,
  limit = 20,
  offset?: number,
  market?: string
) => await getMySavedItems(session, "episodes", limit, offset, market);

export const getMySavedItems = async (
  session: AuthSession,
  type: "albums" | "audiobooks" | "episodes" | "shows" | "tracks",
  limit = 20,
  offset?: number,
  market?: string
) => {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set("limit", limit.toString());
  if (offset) searchParams.set("offset", offset.toString());
  if (market) searchParams.set("market", market);
  return customFetch(`${V1_BASE}/me/${type}`, session);
};

export const getMySavedShows = async (
  session: AuthSession,
  limit = 20,
  offset?: number
) => await getMySavedItems(session, "shows", limit, offset);

export const getMySavedTracks = async (
  session: AuthSession,
  limit = 20,
  offset?: number,
  market?: string
) => await getMySavedItems(session, "tracks", limit, offset, market);

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
}) => customFetch(`${V1_BASE}/me/top/${type}`, session);

export const getUserById = async ({
  session,
  id,
}: {
  session: AuthSession;
  id: string;
}): Promise<Profile> => customFetch(`${V1_BASE}/users/${id}`, session);

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
export const getNewReleases = async (
  session: AuthSession,
  limit = 20,
  offset?: number
) => {
  const searchParams = new URLSearchParams({ limit: limit.toString() });
  if (offset) searchParams.set("offset", offset.toString());
  return customFetch(`${V1_BASE}/browse/new-releases`, session, searchParams);
};
