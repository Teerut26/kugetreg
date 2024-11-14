import { type IScheduleResponse } from "types/responses/IScheduleResponse";
import { axiosAPIWithAuth } from "utils/axiosAPI";

interface Props {
  stdStatusCode: string;
  campusCode: string;
  facultyCode: string;
  majorCode: string;
  userType: string;
  token: string;
}

const getSchedule = async (props: Props) => {
  try {
    const res = await axiosAPIWithAuth.get<IScheduleResponse>(
      `/common/getschedule?stdStatusCode=${props.stdStatusCode}&campusCode=${props.campusCode}&facultyCode=${props.facultyCode}&majorCode=${props.majorCode}&userType=${props.userType}`,
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getSchedule;
