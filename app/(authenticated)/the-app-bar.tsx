"use client";

import { AuthUser } from "@/types/types";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import defaultProfileImage from "@/public/images/profile.png";
import { useEffect, useState } from "react";

export default function TheAppBar() {
  const [profileImageSrc, setProfileImageSrc] = useState(
    defaultProfileImage.src
  );
  const session = useSession();
  if (!session) {
    redirect("/login");
  }

  const { data } = session;

  useEffect(() => {
    const src =
      ((session.data?.user as AuthUser)?.picture as string) ||
      defaultProfileImage.src;

    setProfileImageSrc(src);
  }, [session.data?.user]);

  return (
    <AppBar
      color="info"
      position="sticky"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit">Logout</Button>
      </Toolbar>
      <Typography variant="h6" component="div">
        hello {(data?.user as AuthUser)?.name}
      </Typography>

      <Link href="/">
        <Button variant="text">Home</Button>
      </Link>
      <Link href="/profile">
        <Button variant="contained">Profile</Button>
      </Link>
      <Link href="/users/99">
        <Button variant="outlined">99</Button>
      </Link>
      <Link href="/playlists">
        <Button variant="contained">Playlists</Button>
      </Link>
      <IconButton>
        <Avatar src={profileImageSrc} />
      </IconButton>
    </AppBar>
  );
}
