import { getCurrentUserProfile } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
  const profile = await getCurrentUserProfile(session);

  return (
    <>
      <Image
        src={profile.images[1].url as string}
        width={profile.images[1].width as number}
        height={profile.images[1].height as number}
        alt="Profile picture"
        priority
      />
      <h1>{profile.country}</h1>
      <h1>{profile.display_name}</h1>
      <h1>{profile.email}</h1>
    </>
  );
}
