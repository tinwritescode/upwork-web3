import { publicProcedure } from "./../trpc";
import { TRPCError } from "@trpc/server";
import { clientProtectedProcedure } from "../middlewares/client";
import { router } from "../trpc";
import { jobCreateSchema } from "./../validation/job";
import { z } from "zod";

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

            skillsAndExperties: {
              connect: skillsAndExperties.map((skill) => ({
                id: skill,
              })),
            },
          },
        });

        return job;
      }
    ),
  getJobs: publicProcedure
    .input(
      z.object({
        offset: z.number().default(0),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input: { limit, offset } }) => {
      const [jobs, jobCount] = await Promise.all([
        await ctx.prisma.job.findMany({
          take: limit,
          skip: offset,
          include: {
            skillsAndExperties: {
              include: {
                SkillsAndExperties: true,
              },
            },
          },
        }),
        await ctx.prisma.job.count(),
      ]);

      return {
        jobs,
        total: jobCount,
      };
    }),
});
