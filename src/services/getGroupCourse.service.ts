import { type IScheduleResponse } from "types/responses/IScheduleResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import { z } from "zod";

export const getGroupCourseSchema = z.object({
  academicYear: z.number(),
  semester: z.number(),
  stdId: z.string(),
});

export type GetGroupCourseInput = z.infer<typeof getGroupCourseSchema>;

const getGroupCourseService = async (props: GetGroupCourseInput) => {
  try {
    const res = await axiosAPIWithAuth.get<IScheduleResponse>(
      `/std-profile/getGroupCourse?academicYear=${props.academicYear}&semester=${props.semester}&stdId=${props.stdId}`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getGroupCourseService;
