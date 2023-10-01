import { computersRouter } from "./computers";
import { router } from "../trpc";
import { userRouter } from "./user";
import { checkoutRouter } from "./checkout";
import { generateRouter } from "./generate";
import { iconsRouter } from "./icons";

export const appRouter = router({
  // computers: computersRouter,
  user: userRouter,
  generate: generateRouter,
  checkout: checkoutRouter,
  icons: iconsRouter,
});

export type AppRouter = typeof appRouter;
