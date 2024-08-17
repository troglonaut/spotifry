import { getMyTopItems } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { ObjWithStringKeys, TimeRange, TrackObject } from "@/types/types";
import { Divider, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { BarChart } from "@/app/lib/mui";

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
    });
    return trackCountByDecade;
  }

  function tracksByYear(tracks: TrackObject[]) {
    const trackCountByYear: ObjWithStringKeys = {};
    tracks.forEach((track) => {
      const year = `${track.album.release_date.substring(0, 4)}`;
      if (!trackCountByYear[year]) {
        trackCountByYear[year] = 1;
      } else {
        trackCountByYear[year]++;
      }
    });
    return trackCountByYear;
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

  const topTracks = {
    long: await getMyTopItems("tracks", session, TimeRange.long, 20),
    medium: await getMyTopItems("tracks", session, TimeRange.medium, 20),
    short: await getMyTopItems("tracks", session, TimeRange.short, 20),
  };

  const trackListLong = trackList(topTracks.long.items);
  const trackListMed = trackList(topTracks.medium.items);
  const trackListShort = trackList(topTracks.short.items);

  const trackCountsByYear = {
    long: tracksByYear(topTracks.long.items),
    med: tracksByYear(topTracks.medium.items),
    short: tracksByYear(topTracks.short.items),
  };

  const trackCountsByDecade = {
    long: tracksByDecade(topTracks.long.items),
    med: tracksByDecade(topTracks.medium.items),
    short: tracksByDecade(topTracks.short.items),
  };

  return (
    <>
      <Typography variant="h1">My Top Tracks</Typography>
      <Typography variant="h2">Long-term</Typography>
      <Divider variant="middle" />
      <div className="flex justify-between">
        {trackListLong}
        <div>
          <Typography variant="h3">Tracks by Year</Typography>
          <BarChart
            xAxis={[
              {
                data: Object.keys(trackCountsByYear.long),
                scaleType: "band",
              },
            ]}
            series={[{ data: Object.values(trackCountsByYear.long) }]}
            height={200}
          />

          <Typography variant="h3">Tracks by Decade</Typography>
          <BarChart
            xAxis={[
              {
                data: Object.keys(trackCountsByDecade.long),
                scaleType: "band",
              },
            ]}
            series={[{ data: Object.values(trackCountsByDecade.long) }]}
            height={200}
          />
        </div>
      </div>

      <Typography variant="h2">Medium-term</Typography>
      <div className="flex justify-between">
        {trackListMed}
        <div>
          <Typography variant="h3">Tracks by Year</Typography>
          <BarChart
            xAxis={[
              {
                data: Object.keys(trackCountsByYear.med),
                scaleType: "band",
              },
            ]}
            series={[{ data: Object.values(trackCountsByYear.med) }]}
            height={200}
          />
          <Typography variant="h3">Tracks by Decade</Typography>
          <BarChart
            xAxis={[
              {
                data: Object.keys(trackCountsByDecade.med),
                scaleType: "band",
              },
            ]}
            series={[{ data: Object.values(trackCountsByDecade.med) }]}
            height={200}
          />
        </div>
      </div>

      <Typography variant="h2">Short-term</Typography>
      <div className="flex justify-between">
        {trackListShort}
        <div>
          <Typography variant="h3">Tracks by Year</Typography>
          <BarChart
            xAxis={[
              {
                data: Object.keys(trackCountsByYear.short),
                scaleType: "band",
              },
            ]}
            series={[{ data: Object.values(trackCountsByYear.short) }]}
            height={200}
          />
          <Typography variant="h3">Tracks by Decade</Typography>
          <BarChart
            xAxis={[
              {
                data: Object.keys(trackCountsByDecade.short),
                scaleType: "band",
              },
            ]}
            series={[{ data: Object.values(trackCountsByDecade.short) }]}
            height={200}
          />
        </div>
      </div>
    </>
  );
}
