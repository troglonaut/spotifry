import { redirect } from "next/navigation";
import { getAuthSession, profileImg } from "@/app/utils/serverUtils";
import { getCurrentUserProfile, getUsersTopItems } from "@/app/lib/actions";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "next/link";
import Sidebar from "@/app/sidebar";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const profile = await getCurrentUserProfile(session);
  const { profileImgSrc } = profileImg({
    profile,
  });
  const topTracks = await getUsersTopItems({ type: "tracks", session });
  const topArtists = await getUsersTopItems({ type: "artists", session });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="secondary"
          position="static"
          className="flex flex-row justify-between"
        >
          <Box>
            <Typography variant="h6">hello {session.user.name}</Typography>
          </Box>

          <Link href="/">
            <Button variant="text">Home</Button>
          </Link>
          <Link href="/profile">
            <Button variant="contained">Profile</Button>
          </Link>
          <Link href="/users/99">
            <Button variant="outlined">99</Button>
          </Link>

          <IconButton>
            <Avatar src={profileImgSrc as string}></Avatar>
          </IconButton>
        </AppBar>
      </Box>
      <Typography>hello {session.user.name}</Typography>
    </>
  );
}
