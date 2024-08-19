"use client";
import { AuthUser } from "@/types/types";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TheAppBar() {
  const session = useSession();
  if (!session) {
    redirect("/login");
  }
  const router = useRouter();

  const [avatarImgSrc, setAvatarImgSrc] = useState(
    (session.data?.user as AuthUser)?.picture as string
  );

  const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const avatarMenuOpen = Boolean(avatarAnchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => setAvatarAnchorEl(null);

  const navToProfile = () => {
    router.push("/profile");
    setAvatarAnchorEl(null);
  };

  const logout = () => signOut();

  const { data } = session;

  useEffect(() => {
    const src = ((session.data?.user as AuthUser)?.picture as string) || "";

    setAvatarImgSrc(src);
  }, [session.data?.user]);

  return (
    <AppBar
      color="primary"
      position="sticky"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 1,
      }}
    >
      <Typography variant="h6" component="div">
        hello {(data?.user as AuthUser)?.name}
      </Typography>

      <Link href="/">
        <Button variant="contained">Home</Button>
      </Link>
      <Link href="/playlists">
        <Button variant="contained">Playlists</Button>
      </Link>
      <Link href="/artists/my-top-artists">
        <Button variant="contained">Top Artists</Button>
      </Link>
      <Link href="/top-tracks">
        <Button variant="contained">Top Tracks</Button>
      </Link>
      <IconButton onClick={handleAvatarClick}>
        <Avatar src={avatarImgSrc} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={avatarAnchorEl}
        open={avatarMenuOpen}
        onClose={handleAvatarMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={navToProfile}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
