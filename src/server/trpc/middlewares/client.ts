import { TRPCError } from "@trpc/server";
import { publicMiddleware } from "../trpc";
import { protectedProcedure } from "./auth";

export const clientProtectedProcedure = protectedProcedure.use(
  publicMiddleware(async ({ ctx, next }) => {
    if (!ctx.session?.user?.isLoggedIn) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access this resource",
      });
    }

    const client = await ctx.prisma.client.findUnique({
      where: { userAddress: ctx.session.user.address },
      select: { id: true },
    });

    if (!client) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not an authorized client",
      });
    }

    return next();
  })
);
