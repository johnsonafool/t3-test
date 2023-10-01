import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

async function generateIcon(prompt: string, numberOfIcons = 1) {
  //   if (env.MOCK_DALLE === "true") {
  //     return new Array<string>(numberOfIcons).fill(b64Image);
  //   } else {
  //     const response = await openai.createImage({
  //       prompt,
  //       n: numberOfIcons,
  //       size: "512x512",
  //       response_format: "b64_json",
  //     });
  //     return response.data.data.map((result) => result.b64_json || "");
  //   }
  return [];
}

export const generateRouter = router({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
        shape: z.string(),
        style: z.string(),
        numberOfIcons: z.number().min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //   const { count } = await ctx.db.user.updateMany({
      //     where: {
      //       id: ctx.session.user.id,
      //       credits: {
      //         gte: input.numberOfIcons,
      //       },
      //     },
      //     data: {
      //       credits: {
      //         decrement: input.numberOfIcons,
      //       },
      //     },
      //   });
      const count = 0;

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits",
        });
      }

      const finalPrompt = `a modern ${input.shape} icon in ${input.color} of ${input.prompt}, ${input.style}, minimialistic, high quality, trending on art station, unreal engine graphics quality`;

      const base64EncodedImages = await generateIcon(
        finalPrompt,
        input.numberOfIcons
      );

      //   const createdIcons = await Promise.all(
      //     base64EncodedImages.map(async (image) => {
      //       const icon = await ctx.prisma.icon.create({
      //         data: {
      //           prompt: input.prompt,
      //           userId: ctx.session.user.id,
      //         },
      //       });
      //       await s3
      //         .putObject({
      //           Bucket: BUCKET_NAME,
      //           Body: Buffer.from(image, "base64"),
      //           Key: icon.id,
      //           ContentEncoding: "base64",
      //           ContentType: "image/png",
      //         })
      //         .promise();
      //       return icon;
      //     })
      //   );

      const createdIcons = [{ id: "123" }];
      const BUCKET_NAME = "test";

      return createdIcons.map((icon) => {
        return {
          imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`,
        };
      });
    }),
});
