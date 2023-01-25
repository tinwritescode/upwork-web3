import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUsers = async () => {
  const user: Prisma.UserCreateInput = {
    // TODO: change me
    address: "0x123",
    role: "ADMIN",
  };

  const createdUser = await prisma.user.upsert({
    create: user,
    update: user,
    where: { address: user.address },
  });

  console.table(createdUser);
};

const createSkillsAndExpertises = async () => {
  const skills: Prisma.SkillsAndExpertiesCreateInput[] = [
    {
      skill: "Technical",
      subItems: {
        createMany: {
          data: [
            {
              name: "Frontend",
            },
            {
              name: "Backend",
            },
            {
              name: "DevOps",
            },
            {
              name: "Blockchain",
            },
            {
              name: "Mobile",
            },
            {
              name: "Data Science",
            },
            {
              name: "AI",
            },
          ],
        },
      },
    },
    {
      skill: "Design",
      subItems: {
        createMany: {
          data: [
            {
              name: "UX",
            },
            {
              name: "UI",
            },
            {
              name: "Graphic",
            },
          ],
        },
      },
    },
    {
      skill: "Marketing",
      subItems: {
        createMany: {
          data: [
            {
              name: "SEO",
            },
            {
              name: "Social Media",
            },
            {
              name: "Content",
            },
          ],
        },
      },
    },
    {
      skill: "Business",
      subItems: {
        createMany: {
          data: [
            {
              name: "Strategy",
            },
            {
              name: "Management",
            },
            {
              name: "Sales",
            },
          ],
        },
      },
    },
  ];

  const createdSkills = await Promise.all(
    skills.map((skill) =>
      prisma.skillsAndExperties.create({
        data: skill,
      })
    )
  );

  console.table(createdSkills);
};

(async function main() {
  await createUsers();
  await createSkillsAndExpertises();
  await prisma.$disconnect();
})();
