import { getMyProfile } from "@/app/lib/actions";
import { getAuthSession, profileImg } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";
import Image from "next/image";
import Typography from "@mui/material/Typography";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const profile = await getMyProfile(session);
  const { profileImgSrc, profileImgHeight, profileImgWidth } = profileImg({
    profile,
  });

  return (
    <>
      <Image
        src={profileImgSrc}
        width={profileImgWidth}
        height={profileImgHeight}
        alt="Profile picture"
        className="rounded"
        priority
      />
      <Typography variant="h1" className="font-bold">
        {profile.display_name}
      </Typography>
      <Typography variant="h2" className="test-class">
        {profile.email}
      </Typography>
    </>
  );
}
