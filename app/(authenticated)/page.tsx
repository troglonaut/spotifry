import { redirect } from "next/navigation";
import { getAuthSession } from "@/app/utils/serverUtils";
import { getUsersTopItems } from "@/app/lib/actions";
import SideBar from "@/app/sidebar";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const topTracks = await getUsersTopItems({ type: "tracks", session });
  const topArtists = await getUsersTopItems({ type: "artists", session });

  return (
    <>
      <h1>hello {user.name}</h1>
      <SideBar topTracks={topTracks} topArtists={topArtists} />
    </>
  );
}
