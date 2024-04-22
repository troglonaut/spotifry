import { getUserById } from "@/app/lib/actions";
import { getAuthSession, profileImg } from "@/app/utils/serverUtils";
import { Profile } from "@/types/types";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Typography from "@mui/material/Typography";

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const profile = (await getUserById({ session, id: params.id })) as Profile;

  if (!profile.id) {
    notFound();
  }

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
        priority
      />

      <Typography variant="h3">{profile.display_name}</Typography>
    </>
  );
}
