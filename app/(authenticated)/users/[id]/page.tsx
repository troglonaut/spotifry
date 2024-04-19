import { getUsersProfile } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { redirect } from "next/navigation";

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session) redirect("/login");

  const user = await getUsersProfile({ session, id: params.id });
}
