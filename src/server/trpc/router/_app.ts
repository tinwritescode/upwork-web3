import { adminRouter } from "./admin/index";
import { jobRouter } from "./job";
import { clientRouter } from "./appClient";
import { authRouter } from "./auth";
import { router } from "../trpc";

export const appRouter = router({
  auth: authRouter,
  appClient: clientRouter,
  job: jobRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
