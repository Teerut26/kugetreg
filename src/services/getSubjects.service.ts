import { BaseApiStructure } from "types/responses/IBaseApiStructure";
import { type IScheduleResponse } from "types/responses/IScheduleResponse";
import { ISubjectResponse } from "types/responses/ISubjectResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import { z } from "zod";

export const GetSubjectsSchema = z.object({
  query: z.string(),
  academicYear: z.number(),
  semester: z.number(),
  campusCode: z.string(),
});

export type GetSubjectsInput = z.infer<typeof GetSubjectsSchema>;

const getSubjectsService = async (props: GetSubjectsInput) => {
  try {
    const res = await axiosAPIWithAuth.get<BaseApiStructure<ISubjectResponse[]>>(
      `/enroll/openSubjectForEnroll?query=${props.query}&academicYear=${props.academicYear}&semester=${props.semester}&campusCode=${props.campusCode}&section=`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getSubjectsService;
