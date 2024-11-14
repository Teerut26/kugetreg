import getSubjectService, {
  GetSubjectSchema,
} from "@/services/getSubject.service";
import { protectedProcedure } from "../../trpc";

const getSubject = protectedProcedure
  .input(GetSubjectSchema)
  .mutation(async ({ input }) => {
    try {
      return getSubjectService(input);
    } catch (error) {
      throw error;
    }
  });
export default getSubject;
