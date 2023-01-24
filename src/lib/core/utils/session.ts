import type { Role } from "@prisma/client";
// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import { env } from "../../../env/server.mjs";

export type User = {
  isLoggedIn: boolean;
  timestamp: number;
  address: string;
  sqlid: string;
  role: Role;
};

export const sessionOptions: IronSessionOptions = {
  password: env.JWT_SECRET,
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
    loginNonce?: number;
  }
}
