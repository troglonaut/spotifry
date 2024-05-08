"use client";

import { ArtistObject, AuthSession, TrackObject } from "@/types/types";
import Typography from "@mui/material/Typography";

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
  return (
    <>
      <Typography variant="h4">Sidebar</Typography>
    </>
  );
}
