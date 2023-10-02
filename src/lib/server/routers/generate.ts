import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { generateIcon } from "@/lib/api/generate/mutations";

const generateIconSchema = z.object({
  prompt: z.string(),
  color: z.string(),
  shape: z.string(),
  style: z.string(),
  numberOfIcons: z.number().min(1).max(10),
});

export const generateRouter = router({
  generateIcon: protectedProcedure
    .input(generateIconSchema)
    .mutation(async ({ ctx, input }) => {
      return generateIcon({ ctx, input });
    }),
});
