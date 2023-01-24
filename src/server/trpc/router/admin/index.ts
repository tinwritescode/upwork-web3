import { skillsAndExpertiesRouter } from "./skillsAndExpertises";
import { router } from "../../trpc";

export const adminRouter = router({
  skillsAndExpertises: skillsAndExpertiesRouter,
});
