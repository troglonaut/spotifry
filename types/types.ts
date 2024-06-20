import { Session } from "inspector";
import { DefaultSession } from "next-auth";

export interface Album {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  restrictions: Restrictions;
  type: "album";
  uri: string;
}

export interface ArtistObject {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: ImageObject;
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
}

export interface Audiobook {
  authors: AuthorObject[];
  available_markets: string[];
  copyrights: CopyrightObject;
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: NarratorObject[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}

export interface AuthorObject {
  name?: string;
}

export interface AuthUser {
  accessToken: string;
  refreshToken: string;
  email: string;
  expires_at: number;
  image?: string | null;
  name: string;
  picture?: string | null;
  sub: string /** SPOTIFY USER ID. stands for "subject id" */;
}

export interface AuthSession extends Omit<DefaultSession, "user"> {
  user: AuthUser;
}

export interface Category {
  href: string;
  icons: CategoryIcon[];
  id: string;
  name: string;
}

export interface CategoryIcon {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Chapter {
  audio_preview_url: string | null;
  available_markets?: string[];
  chapter_number: number;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  resume_point?: ResumePoint;
  type: "episode";
  uri: string;
  restrictions?: Restrictions;
  audioBook: Audiobook;
}

export interface CopyrightObject {
  text?: string;
  type?: "C" | "P";
}

export interface EpisodeObject {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  resume_point: ResumePoint;
  type: "episode";
  uri: string;
  restrictions: Restrictions;
  show: ShowObject;
}

export interface ExplicitContentFilterConfig {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface ExternalUrls {
  spotify?: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface GetMyPlaylistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: string;
  previous: null;
  total: number;
  items: PlaylistOfMine[];
}

export interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}

export interface NarratorObject {
  name?: string;
}

export interface Owner {
  display_name: string | null;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: "user";
  uri: string;
}

export interface Playlist {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: TrackObject[];
  type: "playlist";
  uri: string;
}

export interface PlaylistOfMine
  extends Modify<
    Playlist,
    {
      primary_color: string | null;
      tracks: PlaylistOfMineTrackObj;
    }
  > {}

export interface PlaylistOfMineTrackObj {
  href: string;
  total: number;
}

export interface PlaylistTrackObject {
  added_at: string;
  added_by: AuthUser;
  is_local: boolean;
  track: TrackObject | EpisodeObject;
  type: "playlist";
  uri: string;
}

export interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContentFilterConfig;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  type: "user";
  uri: string;
}

export interface ReleaseDatePrecision {
  YEAR: "year";
  MONTH: "month";
  DAY: "day";
}

export interface Restrictions {
  reason: "market" | "product" | "explicit";
}

export interface ResumePoint {
  fully_played?: boolean;
  resume_position_ms?: number;
}

export interface SearchRequestParams {
  q: string;
  session: AuthSession;
  typeArr: SearchType[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: "audio";
}

export interface SearchResponse {
  tracks: SearchTracksObj;
  artists: SearchArtistsObj;
  albums: SearchAlbumsObj;
  playlists: SearchPlaylistsObj;
  shows: SearchShowsObj;
  episodes: SearchEpisodesObj;
  audiobooks: SearchAudiobooksObj;
}

export enum SearchType {
  album = "album",
  artist = "artist",
  audiobook = "audiobook",
  episode = "episode",
  playlist = "playlist",
  show = "show",
  track = "track",
}

export interface SearchAlbumsObj {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedPlaylistObject[];
}

export interface SearchArtistsObj {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: ArtistObject[];
}

export interface SearchAudiobooksObj {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedAudiobookObject[];
}

export interface SearchEpisodesObj {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedEpisodeObject[];
}

export interface SearchShowsObj {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedShowObject[];
}

export interface SearchTracksObj {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: TrackObject[];
}

export interface SearchPlaylistsObj {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Playlist[];
}

export interface SimplifiedArtistObject {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface SimplifiedAudiobookObject {
  authors: AuthorObject[];
  available_markets: string[];
  copyrights: CopyrightObject;
  decription: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: NarratorObject[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}

export interface SimplifiedEpisodeObject {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  resume_point: ResumePoint;
  type: "episode";
  uri: string;
  restrictions: Restrictions;
}

export interface SimplifiedPlaylistObject {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: SimpleTracks;
  type: "playlist";
  uri: string;
}

export interface SimplifiedShowObject {
  available_markets: string[];
  copyrights: CopyrightObject;
  description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  html_description: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  total_episodes: number;
  type: "show";
  uri: string;
}

export interface SimpleTracks {
  href: string;
  total: number;
}

export interface ShowObject {
  available_markets: string[];
  copyrights: CopyrightObject;
  description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  html_description: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  total_episodes: number;
  type: "show";
  uri: string;
}

export interface TrackObject {
  album: Album;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  linked_from: object;
  name: string;
  popularity: number;
  preview_url: string | null;
  restrictions: Restrictions;
  track_number: number;
  type: "album";
  uri: string;
}

export interface Tracks {
  href: string;
  items: PlaylistTrackObject[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export enum TimeRange {
  long = "long_term",
  medium = "medium_term",
  short = "short_term",
}

type Modify<T, R> = Omit<T, keyof R> & R;
