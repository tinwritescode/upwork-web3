import { z } from "zod";

export const createSubSkillSchema = z.object({
  skillId: z.coerce.bigint(),
  name: z.string(),
});
