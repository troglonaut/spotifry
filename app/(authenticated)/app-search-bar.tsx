"use client";

import { FunctionComponent, useState } from "react";
import { AuthSession, SearchResponse, SearchType } from "@/types/types";
import { Box, Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { searchSpotify } from "../lib/actions";

export const defaultSearchTypes = [
  SearchType.album,
  SearchType.artist,
  SearchType.audiobook,
  SearchType.episode,
  SearchType.playlist,
  SearchType.show,
  SearchType.track,
];

export interface AppSearchBarProps {
  typeArr?: SearchType[];
}

export const AppSearchBar: FunctionComponent<AppSearchBarProps> = ({
  typeArr = defaultSearchTypes,
}) => {
  const session = useSession();
  if (!session) {
    redirect("/login");
  }
  const authSession = session.data as AuthSession;
  const [query, setQuery] = useState("");

  function search(): Promise<SearchResponse> {
    return searchSpotify({
      session: session.data as AuthSession,
      q: query,
      typeArr,
    }).then((x) => {
      console.info(`%c🔬 x`, "color: limegreen; font-size: 20px;", x);
      return x;
    });
  }

  return (
    <Box>
      <TextField
        id="appSearchBar"
        label="Controlled"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value);
        }}
        color="primary"
      />
      <Button onClick={search}>Search</Button>
    </Box>
  );
};

export default AppSearchBar;
