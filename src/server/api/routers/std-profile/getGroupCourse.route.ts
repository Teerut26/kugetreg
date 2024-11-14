import { protectedProcedure } from "../../trpc";
import getGroupCourseService, {
  getGroupCourseSchema,
} from "@/services/getGroupCourse.service";

const getGroupCourse = protectedProcedure
  .input(getGroupCourseSchema)
  .mutation(async ({ input }) => {
    try {
      return getGroupCourseService(input);
    } catch (error) {
      throw error;
    }
  });

export default getGroupCourse;
