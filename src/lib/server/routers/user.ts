import { db } from "@/lib/db";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  getCredits: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const user = await db.query.user.findFirst({
      where: {
        // @ts-ignore
        id: userId,
      },
    });

    // @TODO: change db schema to return credits
    // return user?.credits;
    return user?.image;
  }),
});
