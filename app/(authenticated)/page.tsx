import { redirect } from "next/navigation";
import { getAuthSession } from "@/app/utils/serverUtils";
import Typography from "@mui/material/Typography";

export const metadata = {
  title: "Home",
};

export default async function HomePage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Typography variant="h1">hello {session.user.name}</Typography>
    </>
  );
}
