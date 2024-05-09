import { getMyPlaylists } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";
import MyPlaylistsTable from "./my-playlists";

export default async function UsersPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const res = await getMyPlaylists(session, 50);

  const { href, limit, next, offset, previous, total, items: data } = res;

  return <MyPlaylistsTable data={data} />;
}
