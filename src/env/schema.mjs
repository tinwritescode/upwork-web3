// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  JWT_SECRET: z.string(),
  APP_NAME: z.string()
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY: z.string(),
  NEXT_PUBLIC_CONTRACT_ADDRESS: z.string(),
  NEXT_PUBLIC_CHAIN_ID: z.coerce.number(),
  NEXT_PUBLIC_SESSION_EXPIRED_IN_DAYS: z.coerce.number(),
  NEXT_PUBLIC_CONTRACT_NAME: z.string(),
  NEXT_PUBLIC_NETWORK: z.string()
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY,
  NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  NEXT_PUBLIC_SESSION_EXPIRED_IN_DAYS: process.env.NEXT_PUBLIC_SESSION_EXPIRED_IN_DAYS,
  NEXT_PUBLIC_CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME,
  NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK
};
