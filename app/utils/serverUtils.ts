import { AuthSession, Profile } from "@/types/types";
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
  profile: Profile;
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

export const ellipseStyles = {
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  // width: "100px",
  display: "block",
  overflow: "hidden",
};
