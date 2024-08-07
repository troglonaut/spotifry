import { getMyTopItems } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { ObjWithStringKeys, TimeRange, TrackObject } from "@/types/types";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Top Tracks",
};

export default async function TopTracksPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  function tracksByDecade(tracks: TrackObject[]) {
    const trackCountByDecade: ObjWithStringKeys = {};
    tracks.forEach((track) => {
      const decade = `${track.album.release_date.substring(0, 3)}0`;
      if (!trackCountByDecade[decade]) {
        trackCountByDecade[decade] = 1;
      } else {
        trackCountByDecade[decade]++;
      }
      return trackCountByDecade;
    });
  }

  function trackList(tracks: TrackObject[]) {
    return (
      <ol>
        {tracks.map((track: TrackObject) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ol>
    );
  }

  const myTopTracksLong = await getMyTopItems(
    "tracks",
    session,
    TimeRange.long,
    40
  );

  const trackListLong = trackList(myTopTracksLong.items);

  const myTopTracksMed = await getMyTopItems(
    "tracks",
    session,
    TimeRange.medium,
    40
  );

  const trackListMed = trackList(myTopTracksMed.items);

  const myTopTracksShort = await getMyTopItems(
    "tracks",
    session,
    TimeRange.short,
    40
  );

  const trackListShort = trackList(myTopTracksShort.items);

  tracksByDecade(myTopTracksLong.items);

  return (
    <>
      <Typography variant="h1">My Top Tracks</Typography>
      <Typography variant="h2">Long-term</Typography>
      {trackListLong}

      <Typography variant="h2">Medium-term</Typography>
      {trackListMed}

      <Typography variant="h2">Short-term</Typography>
      {trackListLong}
    </>
  );
}
