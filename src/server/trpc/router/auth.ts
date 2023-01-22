import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  getNonce: publicProcedure.query(async ({ ctx }) => {
    const nonce = ctx.session.loginNonce;

    if (nonce) {
      return {
        nonce,
      };
    }

    // Return random nonce that can't be brute forced
    const loginNonce = (ctx.session.loginNonce = Math.floor(
      100000000 + Math.random() * 900000000
    ));
    await ctx.session.save();

    return {
      nonce: loginNonce,
      message: `I agree to the terms and conditions of ${env.APP_NAME}`,
    };
  }),
  login: publicProcedure
    .input(
      z.object({
        address: z.string(),
        // signature: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { address } = input;
      // TODO: check for signature + nonce match with address

      const user = await ctx.prisma.user.upsert({
        where: {
          address,
        },
        update: {},
        create: {
          address,
        },
      });

      ctx.session.user = {
        isLoggedIn: true,
        address,
        timestamp: Date.now(),
        sqlid: user.id.toString(),
      };

      await ctx.session.save();

      return {
        address,
        message: "Logged in",
      };
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.session.user = undefined;

    await ctx.session.save();

    return {
      message: "Logged out",
    };
  }),
  getSession: publicProcedure.query(async ({ ctx }) => {
    return (
      ctx.session.user ||
      ({
        isLoggedIn: false,
      } as { isLoggedIn: false })
    );
  }),
});
