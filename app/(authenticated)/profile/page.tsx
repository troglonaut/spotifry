import { getCurrentUserProfile } from "@/app/lib/actions";
import { getAuthSession, profileImg } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const user = await getCurrentUserProfile(session);

  const { profileImgSrc, profileImgHeight, profileImgWidth } = profileImg({
    user,
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
      <h1>{user.country}</h1>
      <h1>{user.display_name}</h1>
      <h1>{user.email}</h1>
    </>
  );
}
