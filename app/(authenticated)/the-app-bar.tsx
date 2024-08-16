"use client";
import { AuthUser } from "@/types/types";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import defaultProfileImage from "@/public/images/profile.png";
import { useLayoutEffect, useState } from "react";

export default function TheAppBar() {
  const [profileImageSrc, setProfileImageSrc] = useState(
    defaultProfileImage.src
  );

  const session = useSession();
  if (!session) {
    redirect("/login");
  }

  const router = useRouter();

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const profileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleProfileImgClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const navToProfile = () => {
    router.push("profile");
    setProfileMenuAnchorEl(null);
  };

  const logout = () => {
    signOut();
  };

  const { data } = session;

  useLayoutEffect(() => {
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
        marginBottom: 1,
      }}
    >
      <Typography variant="h6" component="div">
        hello {(data?.user as AuthUser)?.name}
      </Typography>

      <Link href="/">
        <Button variant="contained">Home</Button>
      </Link>
      <Link href="/users/99">
        <Button variant="contained">99</Button>
      </Link>
      <Link href="/playlists">
        <Button variant="contained">Playlists</Button>
      </Link>
      <Link href="/top-artists">
        <Button variant="contained">Top Artists</Button>
      </Link>
      <Link href="/top-tracks">
        <Button variant="contained">Top Tracks</Button>
      </Link>
      <IconButton onClick={handleProfileImgClick}>
        <Avatar src={profileImageSrc} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={profileMenuAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
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
