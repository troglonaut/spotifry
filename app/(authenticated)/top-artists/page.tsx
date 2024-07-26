import { getMyTopItems } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { ArtistObject, TimeRange } from "@/types/types";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  function artistList(artistList: ArtistObject[]) {
    return (
      <ol>
        {artistList.map((artist: ArtistObject) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ol>
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
