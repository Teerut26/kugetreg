import getSubjectsService, {
  GetSubjectsSchema,
} from "@/services/getSubjects.service";
import { protectedProcedure } from "../../trpc";

const getSubjects = protectedProcedure
  .input(GetSubjectsSchema)
  .mutation(async ({ input }) => {
    try {
      return getSubjectsService(input);
    } catch (error) {
      throw error;
    }
  });
export default getSubjects;
