import { protectedProcedure, publicProcedure, router } from "../trpc";

export const iconsRouter = router({
  //   getIcons: protectedProcedure.query(async ({ ctx }) => {
  //     const icons = await ctx.prisma.icon.findMany({
  //       where: {
  //         userId: ctx.session.user.id,
  //       },
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //     });
  //     return icons;
  //   }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    const icons = await ctx.db.query.icons.findMany({
      take: 50,
      orderBy: {
        // @ts-ignore
        createdAt: "desc",
      },
    });
    return icons;
  }),
});
