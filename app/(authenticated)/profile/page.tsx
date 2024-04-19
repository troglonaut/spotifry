import { getCurrentUserProfile } from "@/app/lib/actions";
import { getAuthSession, profileImg } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";
import defaultProfileImage from "@/public/images/profile.png";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const profile = await getCurrentUserProfile(session);

  const { profileImgSrc, profileImgHeight, profileImgWidth } = profileImg({
    session,
    user: profile,
  });

  return (
    <>
      <Image
        src={profileImgSrc}
        width={profileImgWidth}
        height={profileImgHeight}
        alt="Profile picture"
        priority
      />
      <h1>{profile.country}</h1>
      <h1>{profile.display_name}</h1>
      <h1>{profile.email}</h1>
    </>
  );
}
