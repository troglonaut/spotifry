import { getUsersProfile } from "@/app/lib/actions";
import { getAuthSession, profileImg } from "@/app/utils/serverUtils";
import { User } from "@/types/types";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const user = (await getUsersProfile({ session, id: params.id })) as User;

  if (!user.id) {
    notFound();
  }

  const { profileImgSrc, profileImgHeight, profileImgWidth } = profileImg({
    user,
  });

  return (
    <main>
      <Image
        src={profileImgSrc}
        width={profileImgWidth}
        height={profileImgHeight}
        alt="Profile picture"
        priority
      />

      <h1>{user.display_name}</h1>
    </main>
  );
}
