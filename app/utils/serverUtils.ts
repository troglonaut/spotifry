import { AuthSession, SearchType, SpotifyUser, TimeRange } from "@/types/types";
import { getServerSession } from "next-auth/next";
import defaultProfileImage from "@/public/images/profile.png";
import { StaticImageData } from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const getAuthSession = async () => {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return null;
  }

  const currentTimestamp = Math.floor(Date.now());
  if (currentTimestamp >= session.user.expires_at * 1000) {
    return null;
  }

  return session;
};

export const customFetch = async (
  url: string,
  session: AuthSession | null,
  searchParams?: URLSearchParams
) => {
  if (!session) {
    return null;
  }

  return await fetch(
    `${url}${searchParams ? "?" : ""}${searchParams?.toString() || ""}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    }
  ).then((res) => res.json());
};

export const profileImg = ({
  profile,
  width,
  height,
}: {
  profile: SpotifyUser;
  width?: number;
  height?: number;
}) => {
  const profileImgSrc: string | StaticImageData =
    (profile.images.length && profile.images[profile.images.length - 1].url) ||
    defaultProfileImage;

  const [profileImgWidth, profileImgHeight] = [
    width ||
      (profile.images.length &&
        profile.images[profile.images.length - 1]?.width) ||
      defaultProfileImage.width,
    height ||
      (profile.images.length &&
        profile.images[profile.images.length - 1]?.height) ||
      defaultProfileImage.height,
  ];

  return { profileImgSrc, profileImgHeight, profileImgWidth };
};

export const createSearchParams = ({
  after,
  include_external,
  limit,
  locale,
  market,
  offset,
  q,
  time_range,
  type,
}: {
  after?: string;
  include_external?: "audio";
  limit?: number;
  locale?: string;
  market?: string;
  offset?: number;
  q?: string;
  time_range?: TimeRange;
  type?: string;
}): URLSearchParams => {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set("limit", limit.toString());
  if (after) searchParams.set("after", after);
  if (include_external) searchParams.set("include_external", include_external);
  if (market) searchParams.set("market", market);
  if (time_range) searchParams.set("time_range", time_range);
  if (locale) searchParams.set("locale", locale);
  if (offset) searchParams.set("offset", offset.toString());
  if (type) searchParams.set("type", type);
  if (q) searchParams.set("q", q);
  return searchParams;
};

export const allSearchTypes = [
  SearchType.album,
  SearchType.artist,
  SearchType.audiobook,
  SearchType.episode,
  SearchType.playlist,
  SearchType.show,
];
