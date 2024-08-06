import { getMyTopItems } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { ArtistObject, ObjWithStringKeys, TimeRange } from "@/types/types";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { PieChart } from "@mui/x-charts/PieChart";

export const metadata = {
  title: "My Top Artists",
};

export default async function TopArtistsPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  function artistList(artists: ArtistObject[]) {
    return (
      <ol>
        {artists.map((artist: ArtistObject) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ol>
    );
  }

  function GroupArtistsByTopGenre(artists: ArtistObject[]) {
    "use client";
    const genreCounts: ObjWithStringKeys = {};
    const seriesData = [];
    const simplifiedArtists = artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      genre: artist.genres[0],
    }));

    simplifiedArtists.forEach((artist) => {
      const { genre } = artist;
      if (genreCounts[genre]) {
        genreCounts[genre]++;
      } else {
        genreCounts[genre] = 1;
      }
    });

    for (const key in genreCounts) {
      seriesData.push({ id: key, value: Number(genreCounts[key]), label: key });
    }

    const series = { data: seriesData };

    // return <PieChart series={[{data: seriesData}]} />;
    return seriesData;
  }

  const myTopArtistsLong = await getMyTopItems(
    "artists",
    session,
    TimeRange.long,
    40
  );

  const artistListLong = artistList(myTopArtistsLong.items);
  const longSeries = groupArtistsByTopGenre(myTopArtistsLong.items);

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
      <PieChart series={[{ data: longSeries }]} />
      {/* <GroupArtistsByTopGenre /> */}

      <Typography variant="h2">Medium-term</Typography>
      {artistListMed}

      <Typography variant="h2">Short-term</Typography>
      {artistListShort}
    </>
  );
}
