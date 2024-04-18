import { redirect } from "next/navigation";
import { getAuthSession } from "@/app/utils/serverUtils";
import { getCurrentUserProfile } from "../lib/actions";
import SideBar from "../sidebar";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const profile = await getCurrentUserProfile(session);
  const profileEntries = Object.entries(profile);

  return (
    <>
      <h1>hello {user.name}</h1>
      <SideBar userId={profile.id} />
      {profileEntries.map((entry) => {
        return (
          <div className="flex" key={entry[0]}>
            {entry[0]}: {new String(entry[1])}
          </div>
        );
      })}
    </>
  );
}
