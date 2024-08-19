import { getMyTopItems } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { ArtistObject, TimeRange } from "@/types/types";
import { Grid, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "My Top Artists" };

export default async function TopArtistsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/login");

  function artistList(artistList: ArtistObject[]) {
    return (
      <Grid container spacing={1} xs={11}>
        {artistList.map((artist: ArtistObject, index: number) => (
          <Grid item xs={2} key={artist.id}>
            <Link href={`/artists/${artist.id}`}>
              <div className="flex flex-col justify-between h-full bg-slate-100 rounded p-2">
                <Typography variant="overline" className="truncate">
                  {`${index + 1}. ${artist.name}`}
                </Typography>
                <Image
                  src={artist.images[0]?.url as string}
                  alt={`${artist.name} image`}
                  width={300}
                  height={300}
                  className="aspect-square object-contain rounded bg-neutral-950"
                />
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  const myTopArtistsLong = await getMyTopItems(
    "artists",
    session,
    TimeRange.long,
    20
  );

  const artistListLong = artistList(myTopArtistsLong.items);

  const myTopArtistsMed = await getMyTopItems(
    "artists",
    session,
    TimeRange.medium,
    20
  );

  const artistListMed = artistList(myTopArtistsMed.items);

  const myTopArtistsShort = await getMyTopItems(
    "artists",
    session,
    TimeRange.short,
    20
  );

  const artistListShort = artistList(myTopArtistsShort.items);

  return (
    <>
      <Typography variant="h2">My Top Artists</Typography>
      <Typography variant="h4" className="mt-6">
        Long-term
      </Typography>
      {artistListLong}

      <Typography variant="h4" className="mt-6">
        Medium-term
      </Typography>
      {artistListMed}

      <Typography variant="h4" className="mt-6">
        Short-term
      </Typography>
      {artistListShort}
    </>
  );
}
