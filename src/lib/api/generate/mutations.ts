import OpenAI from "openai";
import { b64Image } from "@/data/b64Image";
import { env } from "@/lib/env.mjs";
import { TRPCError } from "@trpc/server";

const BUCKET_NAME = "icon-generator-course";

const openai = new OpenAI({
  apiKey: "my api key", // defaults to process.env["OPENAI_API_KEY"]
});

async function generateAiImage(prompt: string, numberOfIcons = 1) {
  if (env.MOCK_DALLE === "true") {
    return new Array<string>(numberOfIcons).fill(b64Image);
  } else {
    return new Array<string>(numberOfIcons).fill(b64Image);
    // const response = await openai.createImage({
    //   prompt,
    //   n: numberOfIcons,
    //   size: "512x512",
    //   response_format: "b64_json",
    // });
    // return response.data.data.map((result) => result.b64_json || "");
  }
}

type GenerateIconInput = {
  ctx: any;
  input: {
    prompt: string;
    color: string;
    shape: string;
    style: string;
    numberOfIcons: number;
  };
};

export const generateIcon = async ({ ctx, input }: GenerateIconInput) => {
  const { count } = await ctx.prisma.user.updateMany({
    where: {
      id: ctx.session.user.id,
      credits: {
        gte: input.numberOfIcons,
      },
    },
    data: {
      credits: {
        decrement: input.numberOfIcons,
      },
    },
  });

  if (count <= 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "you do not have enough credits",
    });
  }

  const finalPrompt = `a modern ${input.shape} icon in ${input.color} of ${input.prompt}, ${input.style}, minimialistic, high quality, trending on art station, unreal engine graphics quality`;

  const base64EncodedImages = await generateAiImage(
    finalPrompt,
    input.numberOfIcons
  );

  const createdIcons = await Promise.all(
    base64EncodedImages.map(async (image) => {
      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
        },
      });
      // await s3
      //   .putObject({
      //     Bucket: BUCKET_NAME,
      //     Body: Buffer.from(image, "base64"),
      //     Key: icon.id,
      //     ContentEncoding: "base64",
      //     ContentType: "image/png",
      //   })
      //   .promise();
      return icon;
    })
  );

  return createdIcons.map((icon) => {
    return {
      imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`,
    };
  });
};
