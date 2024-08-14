import { getArtist } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";

export default async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const artist = await getArtist(session, params.id);

  // if (!profile.id) {
  //   notFound();
  // }

  return (
    <>
      <div>{artist?.name}</div>
    </>
  );
}
