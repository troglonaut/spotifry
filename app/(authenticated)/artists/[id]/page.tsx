import { getArtist } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) return { title: "Playlist" };

  const artist = await getArtist(session, params.id);
  if (!artist || (artist as any).error) return { title: "Artist" };

  return { title: artist.name };
}

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
  if (!artist.id) {
    notFound();
  }

  return <div>{artist?.name}</div>;
}
