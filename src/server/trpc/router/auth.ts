import { z } from "zod";
import { keyStores } from "near-api-js";
import { publicProcedure, router } from "../trpc";
import path from "path";
import { homedir } from "os";

const CREDENTIALS_DIR = ".near-credentials";

const credentialsPath = path.join(homedir(), CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

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
    };
  }),
  login: publicProcedure
    .input(
      z.object({
        address: z.string(),
        signature: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { address, signature } = input;
      const nonce = ctx.session.loginNonce;

      const recoveredAddr = recoverTypedSignature({
        data: [
          {
            name: "nonce",
            type: "string",
            value: nonce?.toString(),
          },
        ],
        signature,
        version: SignTypedDataVersion.V1,
      });

      if (recoveredAddr !== address) {
        throw new Error("Invalid address");
      }

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
      ctx.session.user || {
        isLoggedIn: false,
      }
    );
  }),
});
