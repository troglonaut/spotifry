import { getMyTopItems } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { ArtistObject, TimeRange, ObjWithStringKeys } from "@/types/types";
import { Grid, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import Image from "next/image";
import defaultProfileImage from "@/public/images/profile.png";

export const metadata = { title: "My Top Artists" };

export default async function TopArtistsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/login");

  function artistList(artistList: ArtistObject[]) {
    return (
      <Grid container spacing={2}>
        {artistList.map((artist: ArtistObject, index: number) => (
          <Grid item xs={3} key={artist.id}>
            <div className="flex flex-col justify-between h-full">
              <Typography variant="h5">
                {`${index + 1}. ${artist.name}`}
              </Typography>
              <Image
                src={
                  (artist.images[0]?.url as string) || defaultProfileImage.src
                }
                alt={`${artist.name} image`}
                width={500}
                height={500}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    );
  }

  const myTopArtistsLong = await getMyTopItems(
    "artists",
    session,
    TimeRange.long,
    40
  );

  const artistListLong = artistList(myTopArtistsLong.items);

  const myTopArtistsMed = await getMyTopItems(
    "artists",
    session,
    TimeRange.medium,
    40
  );

  const artistListMed = artistList(myTopArtistsMed.items);

  const myTopArtistsShort = await getMyTopItems(
    "artists",
    session,
    TimeRange.short,
    40
  );

  const artistListShort = artistList(myTopArtistsShort.items);

  return (
    <>
      <Typography variant="h1">My Top Artists</Typography>
      <Typography variant="h2">Long-term</Typography>
      {artistListLong}

      <Typography variant="h2">Medium-term</Typography>
      {artistListMed}

      <Typography variant="h2">Short-term</Typography>
      {artistListShort}
    </>
  );
}
