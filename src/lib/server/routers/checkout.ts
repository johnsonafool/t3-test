import { createCheckout } from "@/lib/api/checkout/mutations";
import { protectedProcedure, router } from "../trpc";

export const checkoutRouter = router({
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return createCheckout(userId);
  }),
});
