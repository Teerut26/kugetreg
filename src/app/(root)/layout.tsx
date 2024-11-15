import { auth, signOut } from "@/server/auth";
import { redirect } from "next/navigation";
import MainLayout from "./_layouts/MainLayout";
import { jwtDecode } from "jwt-decode";
import { type IMYKUToken } from "types/IMYKUToken.type";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  const payload = jwtDecode<IMYKUToken>(session.user.access_token);

  if (payload.exp * 1000 < Date.now()) {
    void signOut();
    return redirect("/sign-in");
  }

  return <MainLayout>{children}</MainLayout>;
}

export const dynamic = "force-dynamic";
