import { TRPCError } from "@trpc/server";
import z from "zod";
import { router } from "../trpc";
import { protectedProcedure } from "../middlewares/auth";

export const clientRouter = router({
  registerClient: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });

      const { name } = input;

      const client = await ctx.prisma.client
        .create({
          data: {
            userAddress: ctx.session.user.address,
            name,
          },
        })
        .catch((e) => {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Client name already exists",
            });
          }
          throw e;
        });

      return client;
    }),

  getClientInfo: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    const client = await ctx.prisma.client.findUnique({
      where: {
        userAddress: ctx.session.user.address,
      },
    });

    return client;
  }),
});
