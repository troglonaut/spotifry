// "use client";

import { Profile } from "@/types/types";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const SpotifyUserContext = createContext<{
  user: Profile | null;
  setUser: Dispatch<SetStateAction<Profile | null>>;
}>({
  user: null,
  setUser: () => null,
});

export const SpotifyUserProvider = ({
  user: initialUser,
  children,
}: PropsWithChildren<{ user: Profile | null }>) => {
  const [user, setUser] = useState(initialUser);

  console.log("ThemeProvider (on server & client)");

  return (
    <SpotifyUserContext.Provider value={{ user, setUser }}>
      {children}
    </SpotifyUserContext.Provider>
  );
};

export const useSpotifyUser = () => {
  return useContext(SpotifyUserContext);
};
