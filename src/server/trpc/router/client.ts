import { TRPCError } from "@trpc/server";
import z from "zod";
import { router } from "../trpc";
import { protectedProcedure } from "./../middlewares/auth";

export const clientRouter = router({
  registerClient: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const { name, address } = input;

      const client = await ctx.prisma.client.upsert({
        where: {},
        update: {},
        create: {
          userId: BigInt(ctx.session.user.sqlid),
          name,
          address,
        },
      });

      return client;
    }),
});
