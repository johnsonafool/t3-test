import { getIcons } from "@/lib/api/icons/queries";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const iconsRouter = router({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    return getIcons();
  }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    return getIcons();
  }),
});
