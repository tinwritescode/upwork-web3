import { toolRouter } from "./tools";
import { clientRouter } from "./appClient";
import { authRouter } from "./auth";
import { router } from "../trpc";

export const appRouter = router({
  auth: authRouter,
  appClient: clientRouter,
  tool: toolRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
