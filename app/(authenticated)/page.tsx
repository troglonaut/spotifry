import { redirect } from "next/navigation";
import { getAuthSession } from "@/app/utils/serverUtils";

export const metadata = {
  title: "Welcome to Spotify",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
}
