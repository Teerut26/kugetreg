import { BaseApiStructure } from "types/responses/IBaseApiStructure";
import { type ISubjectResponse } from "types/responses/ISubjectResponse";
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
    const res = await axiosAPIWithAuth.get<BaseApiStructure<ISubjectResponse[]>>(
      `/enroll/openSubjectForEnroll?query=${props.query}&academicYear=${props.academicYear}&semester=${props.semester}&campusCode=${props.campusCode}&section=${props.section}`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getSubjectService;
