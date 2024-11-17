
import MainLayout from './_layouts/MainLayout';

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <MainLayout>{children}</MainLayout>;
}

export const dynamic = "force-dynamic";
