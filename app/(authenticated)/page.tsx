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

  const { user } = session;
  console.info(
    `%c🔬 user.image`,
    "color: limegreen; font-size: 20px;",
    user.image
  );

  const profile = await getCurrentUserProfile(session);
  const { profileImgSrc, profileImgHeight, profileImgWidth } = profileImg({
    user: profile,
  });
  const topTracks = await getUsersTopItems({ type: "tracks", session });
  const topArtists = await getUsersTopItems({ type: "artists", session });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="flex flex-row justify-between">
          <div>
            <Typography variant="h6">hello {user.name}</Typography>
          </div>

          <IconButton>
            <Avatar src={profileImgSrc as string}></Avatar>
          </IconButton>
        </AppBar>
      </Box>
      <Typography>hello {user.name}</Typography>
      <SideBar
        topTracks={topTracks}
        topArtists={topArtists}
        session={session}
      />
    </>
  );
}
