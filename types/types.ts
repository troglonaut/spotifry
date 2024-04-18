import { DefaultSession } from "next-auth";

export interface AuthUser {
  name: string;
  email: string;
  picture?: string | null;
  image?: string | null;
  accessToken: string;
  sub: string;
  expires_at: number;
}

export interface AuthSession extends Omit<DefaultSession, "user"> {
  user: AuthUser;
}

export interface ExplicitContentFilterConfig {
  filter_enabled: boolean;
  filter_locked: boolean;
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
  height: number;
  width: number;
}

export interface Profile {
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
