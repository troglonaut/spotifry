import { getPlaylist } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import defaultPlaylistImage from "@/public/images/playlist.png";

export default async function PlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session) redirect("/login");

  const playlist = await getPlaylist(session, params.id);
  if (!playlist || (playlist as any).error) notFound();

  // console.info(
  //   `%c🔬 playlist`,
  //   "color: limegreen; font-size: 20px;",
  //   playlist.tracks.items
  // );

  return (
    <>
      <Image
        src={
          playlist.images[1]?.url || // typically 300px
          playlist.images[0]?.url || // typically 640px
          defaultPlaylistImage.src
        }
        alt={"playlist image"}
        width={250}
        height={250}
        priority={true}
      />
      <Typography variant={"h3"}>{playlist.name}</Typography>
      <List>
        {playlist.tracks.items.map((item: any, index: number) => (
          <ListItemButton
            className="pl-5 pr-5"
            disableGutters={true}
            key={index}
          >
            <ListItemText
              primary={`${index + 1}.  ${item.track.name}`}
              secondary={item.track.artists[0].name}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
