"use client";

import { AuthSession, User } from "@/types/types";

export default function SideBar({
  topTracks,
  topArtists,
}: {
  topTracks: any;
  topArtists: any;
}) {
  console.info(
    `%c🔬 topTracks`,
    "color: limegreen; font-size: 20px;",
    topTracks
  );
  console.info(
    `%c🔬 topArtists`,
    "color: limegreen; font-size: 20px;",
    topArtists
  );
  // console.log(
  //   `%c🍄 profile`,
  //   "color: lightblue; font-size: 20px; font-weight: bold;",
  //   profile
  // );
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
