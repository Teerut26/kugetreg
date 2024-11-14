import { api } from "@/trpc/server";
import TableCourse from "./_components/Table";

export default async function Page() {
  const apiRoute = await api.stdProfile.getGroupCourse();
  console.log(apiRoute);

  return (
    <div className="w-full whitespace-pre-wrap">
      {apiRoute.results[0]?.course && (
        <TableCourse data={apiRoute.results[0]?.course} />
      )}
    </div>
  );
}
