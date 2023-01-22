import { clientRouter } from "./appClient";
import { authRouter } from "./auth";
import { router } from "../trpc";

export const appRouter = router({
  auth: authRouter,
  appClient: clientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
