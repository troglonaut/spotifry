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
  release_date_precision: "year" | "month" | "day";
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
  name: string;
}

export interface AuthUser {
  accessToken: string;
  email: string;
  expires_at: number;
  image?: string | null;
  name: string;
  picture?: string | null;
  sub: string;
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
  release_date_precision: "year" | "month" | "day";
  resume_point?: ResumePoint;
  type: "episode";
  uri: string;
  restrictions?: Restrictions;
  audioBook: Audiobook;
}

export interface CopyrightObject {
  text: string;
  type: "C" | "P";
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
  release_date_precision: "year" | "month" | "day";
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
  spotify: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}

export interface NarratorObject {
  name: string;
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

export interface PlaylistTrackObject {
  added_at: string;
  added_by: AuthUser;
  is_local: boolean;
  track: TrackObject | EpisodeObject;
  type: "playlist";
  uri: string;
}

export interface User {
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

export interface Restrictions {
  reason: "market" | "product" | "explicit";
}

export interface ResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}

export interface SimplifiedArtistObject {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
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
  type: string;
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
