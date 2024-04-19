import { getUsersProfile } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { User } from "@/types/types";
import { notFound, redirect } from "next/navigation";

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const user = (await getUsersProfile({ session, id: params.id })) as User;

  if (!user.id) {
    notFound();
  }

  return (
    <main>
      <h1>{user.display_name}</h1>
    </main>
  );
}
