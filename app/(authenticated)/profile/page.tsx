import { getCurrentUserProfile } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const profile = await getCurrentUserProfile(session);
  const id = profile.id;

  return (
    <>
      <h1>{profile.country}</h1>
      <h1>{profile.display_name}</h1>
      <h1>{profile.email}</h1>
    </>
  );
}
