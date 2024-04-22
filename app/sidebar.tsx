"use client";

import { ArtistObject, AuthSession, TrackObject } from "@/types/types";
import { useEffect } from "react";
import { refreshAccessToken } from "./lib/actions";
import Typography from "@mui/material/Typography";

// import { AuthSession, User } from "@/types/types";

export default function SideBar({
  topTracks,
  topArtists,
  session,
}: {
  topTracks: TrackObject[];
  topArtists: ArtistObject[];
  session: AuthSession;
}) {
  const { accessToken, refreshToken, expires_at } = session.user;
  // const oneMinuteEarlySec = Date.parse(Date()) / 1000 - 60;
  // let mostRecentIntervalId: string;
  // const intervalId = setInterval(pollForRefresh, 5000);

  // function clear() {
  //   clearInterval(mostRecentIntervalId);
  // }

  // function pollForRefresh() {
  //   const now = Date();
  //   const nowSec = Date.parse(now) / 1000;
  //   const oneMinuteEarlySec = expires_at - 3100;
  //   if (nowSec >= oneMinuteEarlySec) {
  //     refreshAccessToken(accessToken, refreshToken);f``
  //   }
  // }

  // useEffect(() => {
  //   clear();
  //   window.localStorage.setItem("access_token", accessToken);
  //   window.localStorage.setItem("refresh_token", refreshToken);
  //   setInterval(pollForRefresh, 5000);
  // }, [accessToken, refreshToken]);
  // console.info(`%c🔬 session`, "color: limegreen; font-size: 20px;", session);
  // console.info(
  //   `%c🔬 topTracks`,
  //   "color: limegreen; font-size: 20px;",
  //   topTracks
  // );
  // console.info(
  //   `%c🔬 topArtists`,
  //   "color: limegreen; font-size: 20px;",
  //   topArtists
  // );
  // console.log(
  //   `%c🍄 profile`,
  //   "color: lightblue; font-size: 20px; font-weight: bold;",
  //   profile
  // );
  return (
    <>
      <Typography variant="h4">Sidebar</Typography>
    </>
  );
}
