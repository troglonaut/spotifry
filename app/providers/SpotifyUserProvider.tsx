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

// // import { SessionProvider } from "next-auth/react";

// type Props = {
//   children?: React.ReactNode;
// };

// export const NextAuthProvider = ({ children }: Props) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };
// const SpotifyUserContext = createContext({user: null, setUser: () => ''})
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
