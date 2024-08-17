import {
  AuthSession,
  CreateSearchParamsParams,
  SearchType,
  SpotifyUser,
  TimeRange,
} from "@/types/types";
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

export const createSearchParams = (
  params: CreateSearchParamsParams
): URLSearchParams => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const val = params[key];
    const value =
      typeof val === "number" ? params[key].toString() : params[key];

    // Don't assign values of undefined or null
    value && searchParams.set(key, value);
  }
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
