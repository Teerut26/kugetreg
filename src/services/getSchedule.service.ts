import { type BaseApiStructure } from "types/responses/IBaseApiStructure";
import { type IScheduleResponse } from "types/responses/IScheduleResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";
import { z } from "zod";

export const getScheduleSchema = z.object({
  stdStatusCode: z.string(),
  campusCode: z.string(),
  facultyCode: z.string(),
  majorCode: z.string(),
  userType: z.string(),
});

export type GetScheduleInput = z.infer<typeof getScheduleSchema>;

const getScheduleService = async (props: GetScheduleInput) => {
  try {
    const res = await axiosAPIWithAuth.get<BaseApiStructure<IScheduleResponse[]>>(
      `/common/getschedule?stdStatusCode=${props.stdStatusCode}&campusCode=${props.campusCode}&facultyCode=${props.facultyCode}&majorCode=${props.majorCode}&userType=${props.userType}`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getScheduleService;
