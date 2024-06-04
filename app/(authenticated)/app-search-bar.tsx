import { useState } from "react";
import { AuthSession } from "@/types/types";
import { Box, TextField } from "@mui/material";

export function AppSearchBar({ session }: { session: AuthSession }) {
  const [query, setQuery] = useState("");

  return (
    <Box>
      <TextField
        id="outlined-controlled"
        label="Controlled"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value);
        }}
      />
    </Box>
  );
}
