import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthSession, User } from "@/types/types";
import { getServerSession } from "next-auth/next";
import defaultProfileImage from "@/public/images/profile.png";
import { StaticImageData } from "next/image";

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

export const customFetch = async (url: string, session: AuthSession | null) => {
  if (!session) {
    return null;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
};

export const profileImg = ({
  session,
  user,
  width,
  height,
}: {
  session: AuthSession;
  user: User;
  width?: number;
  height?: number;
}) => {
  const profileImgSrc: string | StaticImageData =
    (user.images.length && user.images[user.images.length - 1].url) ||
    defaultProfileImage;

  const [profileImgWidth, profileImgHeight] = [
    (user.images.length && user.images[user.images.length - 1]?.width) ||
      defaultProfileImage.width,
    (user.images.length && user.images[user.images.length - 1]?.height) ||
      defaultProfileImage.height,
  ];

  return { profileImgSrc, profileImgHeight, profileImgWidth };
};
