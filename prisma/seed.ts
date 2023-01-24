import type { Prisma } from "@prisma/client";
import { prisma } from "../src/server/db/client";

(function main() {
  const user: Prisma.UserCreateInput = {
    // TODO: change me
    address: "0x26",
    role: "ADMIN",
  };

  const createdUser = prisma.user.create({ data: user });

  console.table([createdUser]);
})();
