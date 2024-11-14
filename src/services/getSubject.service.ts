import { type IScheduleResponse } from "types/responses/IScheduleResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import { z } from "zod";

export const GetSubjectSchema = z.object({
  query: z.string(),
  academicYear: z.number(),
  semester: z.number(),
  campusCode: z.string(),
  section: z.string(),
});

export type GetSubjectInput = z.infer<typeof GetSubjectSchema>;

const getSubjectService = async (props: GetSubjectInput) => {
  try {
    const res = await axiosAPIWithAuth.get<IScheduleResponse>(
      `/enroll/openSubjectForEnroll?query=${props.query}&academicYear=${props.academicYear}&semester=${props.semester}&campusCode=${props.campusCode}&section=${props.section}`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getSubjectService;
