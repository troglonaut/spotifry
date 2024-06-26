import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // The arguments user, account, profile and isNewUser are only passed the first time this
    // callback is called on a new session, after the user signs in. In subsequent calls,
    // only token will be available.
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = Number(account.expires_at);
        token.expires_in = Number(account.expires_in);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      } else if (Date.now() < (token.expires_at as number) * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        if (!token.refreshToken) throw new Error("Missing refresh token");

        try {
          // TODO: (EricScottRichards) - why doese uising basic basic ruin the app?
          // const basic = Buffer.from(
          //   `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          // ).toString("base64");

          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization: `Basic ${basic}`,
            },
            body: new URLSearchParams({
              client_id: process.env.SPOTIFY_CLIENT_ID as string,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
            }),
          });

          const tokens = await res.json();

          if (res?.status !== 200) throw tokens;

          return tokens;
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
