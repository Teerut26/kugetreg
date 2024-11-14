import getScheduleService, {
  getScheduleSchema,
} from "@/services/getSchedule.service";
import { protectedProcedure } from "../../trpc";

const getSchedule = protectedProcedure
  .input(getScheduleSchema)
  .mutation(async ({ input }) => {
    try {
      return getScheduleService(input);
    } catch (error) {
      throw error;
    }
  });
export default getSchedule;
