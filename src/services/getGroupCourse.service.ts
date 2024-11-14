import { type BaseApiStructure } from "types/responses/IBaseApiStructure";
import { type IGroupCourseResponse } from "types/responses/IGroupCourseResponse";
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
    const res = await axiosAPIWithAuth.get<
      BaseApiStructure<IGroupCourseResponse[]>
    >(
      `/std-profile/getGroupCourse?academicYear=${props.academicYear}&semester=${props.semester}&stdId=${props.stdId}`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getGroupCourseService;
