import { createSubSkillSchema } from "./validation/skillsAndExpertises";
import { adminProcedure } from "./../../middlewares/auth";
import { router } from "../../trpc";
import { z } from "zod";

export const skillsAndExpertiesRouter = router({
  create: adminProcedure
    .input(
      z.object({
        skill: z.string(),
      })
    )
    .mutation(async ({ input: { skill }, ctx }) => {
      const createdSkill = await ctx.prisma.skillsAndExperties.create({
        data: {
          skill,
        },
      });
      return createdSkill;
    }),
  getAll: adminProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input: { limit, offset } }) => {
      const [skills, skillCount] = await Promise.all([
        ctx.prisma.skillsAndExperties.findMany({
          take: limit,
          skip: offset,
          include: {
            _count: {
              select: { Job: true, subItems: true },
            },
          },
        }),
        ctx.prisma.skillsAndExperties.count(),
      ]);

      console.table([skills[0]]);

      return {
        data: skills.map((skill) => {
          return {
            ...skill,
          };
        }),
        total: skillCount,
      };
    }),

  createSubSkill: adminProcedure
    .input(createSubSkillSchema)
    .mutation(async ({ ctx, input: { skillId, name } }) => {
      const createdSubSkill = await ctx.prisma.skillSubItem.create({
        data: {
          name,
          skillsAndExpertiesId: skillId,
        },
      });
      return createdSubSkill;
    }),

  getSubSkills: adminProcedure
    .input(
      z.object({
        skillId: z.coerce.bigint(),
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input: { skillId, limit, offset } }) => {
      const subSkills = await ctx.prisma.skillSubItem.findMany({
        where: {
          skillsAndExpertiesId: skillId,
        },
        take: limit,
        skip: offset,
      });
      return subSkills;
    }),
  getSkillById: adminProcedure
    .input(
      z.object({
        skillId: z.coerce.bigint(),
      })
    )
    .query(async ({ ctx, input: { skillId } }) => {
      const skill = await ctx.prisma.skillsAndExperties.findUnique({
        where: {
          id: skillId,
        },
      });
      return skill;
    }),
  deleteSubSkill: adminProcedure
    .input(
      z.object({
        subSkillId: z.coerce.bigint(),
      })
    )
    .mutation(async ({ ctx, input: { subSkillId } }) => {
      const deletedSubSkill = await ctx.prisma.skillSubItem.delete({
        where: {
          id: subSkillId,
        },
      });
      return deletedSubSkill;
    }),
  deleteSkill: adminProcedure
    .input(
      z.object({
        skillId: z.coerce.bigint(),
      })
    )
    .mutation(async ({ ctx, input: { skillId } }) => {
      const deletedSkill = await ctx.prisma.skillsAndExperties.delete({
        where: {
          id: skillId,
        },
      });
      return deletedSkill;
    }),
});
