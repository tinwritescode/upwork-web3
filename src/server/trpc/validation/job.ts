import z from "zod";
import {
  LevelRequired,
  PayType,
  ProjectLong,
  ProjectScope,
  ProjectType,
} from "@prisma/client";

export const jobCreateSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    levelRequired: z.nativeEnum(LevelRequired),
    long: z.nativeEnum(ProjectLong),
    payType: z.nativeEnum(PayType),
    projectType: z.nativeEnum(ProjectType),
    scope: z.nativeEnum(ProjectScope),
    skillsAndExperties: z.array(z.string()),
    fixedBudget: z.coerce.number(),
    perHourBudget: z.coerce.number(),
  })
  .refine(
    (data) => {
      return data.fixedBudget || data.perHourBudget;
    },
    {
      message: "One of the two budget fields must be provided",
      path: ["payType"],
    }
  );

export type JobCreateSchema = z.infer<typeof jobCreateSchema>;
