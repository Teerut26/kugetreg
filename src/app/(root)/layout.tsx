import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import MainLayout from "./_layouts/MainLayout";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <MainLayout>{children}</MainLayout>;
}

export const dynamic = "force-dynamic";
