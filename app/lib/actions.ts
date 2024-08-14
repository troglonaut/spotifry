import {
  ArtistObject,
  AuthSession,
  GetMyPlaylistsResponse,
  SearchRequestParams,
  SearchResponse,
  SpotifyUser,
  TimeRange,
} from "@/types/types";
import { createSearchParams, customFetch } from "@/app/utils/serverUtils";

export const SPOTIFY_URL_BASE = "https://api.spotify.com";
export const V1_BASE = `${SPOTIFY_URL_BASE}/v1`;

export const getMyProfile = async (
  session: AuthSession
): Promise<SpotifyUser> => customFetch(`${V1_BASE}/me`, session);

export const getFollowedArtists = async (
  session: AuthSession,
  after?: string,
  limit?: number
): Promise<ArtistObject[]> => {
  const searchParams = createSearchParams({ after, limit });
  return customFetch(`${V1_BASE}/me/following`, session, searchParams);
};

export const getArtist = async (
  session: AuthSession,
  id: ArtistObject["id"]
): Promise<ArtistObject> => customFetch(`${V1_BASE}/artists/${id}`, session);

export const getFeaturedPlaylists = async (
  session: AuthSession,
  locale = "en_US",
  limit?: number,
  offset?: number
) => {
  const searchParams = createSearchParams({ limit, locale, offset });
  return customFetch(
    `${SPOTIFY_URL_BASE}/v1/browse/featured-playlists`,
    session,
    searchParams
  );
};

export const getMyPlaylists = async (
  session: AuthSession,
  limit?: number,
  offset?: number
): Promise<GetMyPlaylistsResponse> => {
  const searchParams = createSearchParams({ limit, offset });
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
  const searchParams = createSearchParams({ limit, offset, market });
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
export const getMyTopItems = async (
  type: "artists" | "tracks",
  session: AuthSession,
  time_range?: TimeRange,
  limit?: number,
  offset?: number
) => {
  const params = createSearchParams({ type, time_range, limit, offset });
  return customFetch(`${V1_BASE}/me/top/${type}`, session, params);
};

export const getUserById = async (
  session: AuthSession,
  id: string
): Promise<SpotifyUser> => customFetch(`${V1_BASE}/users/${id}`, session);

export const getUserPlaylists = async (
  session: AuthSession,
  userId: string,
  limit?: number,
  offset?: number
) => {
  const params = createSearchParams({ limit, offset });
  return customFetch(`${V1_BASE}/users/${userId}/playlists`, session, params);
};

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
  const searchParams = createSearchParams({ limit, offset });
  return customFetch(`${V1_BASE}/browse/new-releases`, session, searchParams);
};

export const searchSpotify = async ({
  session,
  q,
  include_external,
  limit,
  market,
  offset,
  typeArr,
}: SearchRequestParams): Promise<SearchResponse> => {
  const searchParams = createSearchParams({
    q,
    include_external,
    limit,
    market,
    offset,
  });

  if (typeArr.length) {
    searchParams.set("type", typeArr.join(","));
  }
  return customFetch(`${V1_BASE}/search`, session, searchParams);
};
