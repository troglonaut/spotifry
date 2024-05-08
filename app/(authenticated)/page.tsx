import { redirect } from "next/navigation";
import { getAuthSession, profileImg } from "@/app/utils/serverUtils";
import { getCurrentUserProfile, getUsersTopItems } from "@/app/lib/actions";
import SideBar from "@/app/sidebar";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

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
        <AppBar position="static" className="flex flex-row justify-between">
          <Box>
            <Typography variant="h6">hello {session.user.name}</Typography>
          </Box>

          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/users/99">99</Link>

          <IconButton>
            <Avatar src={profileImgSrc as string}></Avatar>
          </IconButton>
        </AppBar>
      </Box>
      <Typography>hello {session.user.name}</Typography>
    </>
  );
}
