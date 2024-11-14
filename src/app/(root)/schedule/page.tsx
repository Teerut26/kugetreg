import { auth } from "@/server/auth";
import getSchedule from "@/services/getSchedule.service";

export default async function Page() {
  const session = await auth();

  const getScheduleResponse = await getSchedule({
    campusCode: session?.user.student.campusCode ?? "",
    facultyCode: session?.user.student.facultyCode ?? "",
    majorCode: session?.user.student.majorCode ?? "",
    stdStatusCode: session?.user.student.studentStatusCode ?? "",
    userType: session?.user.userType ?? "",
  });

  console.log(getScheduleResponse);

  return <div>Page</div>;
}
