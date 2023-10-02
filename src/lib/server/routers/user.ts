import { db } from "@/lib/db";
import { protectedProcedure, router } from "../trpc";
import { getUserCredits } from "@/lib/api/users/queries";

export const userRouter = router({
  getCredits: protectedProcedure.query(async ({ ctx }) => {
    return getUserCredits(ctx.session.user.id);
  }),
});
