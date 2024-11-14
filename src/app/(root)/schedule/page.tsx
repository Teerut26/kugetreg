import { auth } from "@/server/auth";
import getSchedule from "@/services/getSchedule.service";
import { api } from "@/trpc/server";

export default async function Page() {
  const session = await auth();
  const apiRoute = await api.common.getSchedule()
  console.log(apiRoute);
  
  return <div className="w-full whitespace-pre-wrap">{session?.user.access_token}</div>;
}
