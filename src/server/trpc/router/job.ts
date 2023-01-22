import { TRPCError } from "@trpc/server";
import { clientProtectedProcedure } from "../middlewares/client";
import { router } from "../trpc";
import { jobCreateSchema } from "./../validation/job";

export const jobRouter = router({
  createJob: clientProtectedProcedure
    .input(jobCreateSchema)
    .mutation(
      async ({
        input: {
          title,
          content,
          levelRequired,
          long,
          payType,
          projectType,
          scope,
          fixedBudget,
          perHourBudget,
          skillsAndExperties,
        },
        ctx,
      }) => {
        if (!ctx.session?.user?.isLoggedIn) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to access this resource",
          });
        }

        const client = await ctx.prisma.client.findUniqueOrThrow({
          where: { userAddress: ctx.session.user.address },
          select: { id: true },
        });

        if (!client?.id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not an authorized client",
          });
        }

        const job = await ctx.prisma.job.create({
          data: {
            title,
            content,
            levelRequired,
            long,
            payType,
            projectType,
            scope,
            clientId: BigInt(client.id),
            fixedBudget,
            perHourBudget,
            // skillsAndExperties: {
            // TODO: admin should be able to add skills and experties
            // },
          },
        });

        return job;
      }
    ),
});
