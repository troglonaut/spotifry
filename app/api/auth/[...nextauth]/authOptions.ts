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
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = Number(account.expires_at);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      } else if (Date.now() < Number(token.expires_at) * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // Refresh token
        if (!token.refreshToken) throw new Error("Missing refresh token");

        try {
          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.SPOTIFY_CLIENT_ID as string,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
              client_secret: process.env.SPOTIFY_CLIENT_SECRET as string, //added
            }),
          });

          const tokenJSON = await res.json();
          if (!res.ok) throw tokenJSON;

          if (!tokenJSON.refresh_token) {
            return token;
          }

          token.expires_at = Date.now() - tokenJSON.expires_in * 1000;
          token.accessToken = tokenJSON.access_token;
          token.refreshToken = tokenJSON.refresh_token;

          return token;
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
