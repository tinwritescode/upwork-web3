import {
  Badge,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type {
  Job,
  LevelRequired,
  ProjectType,
  SkillsAndExperties,
  SkillSubItem,
} from "@prisma/client";
import moment from "moment";

type Props = {
  href: string;
  job: Job & {
    skillsAndExperties: (SkillSubItem & {
      SkillsAndExperties: SkillsAndExperties | null;
    })[];
  };
} & LinkBoxProps;

function AppJobCard({ job, href, ...rest }: Props) {
  const {
    title,
    projectType,
    payType,
    long,
    createdAt,
    fixedBudget,
    perHourBudget,
    content,
    levelRequired,
    skillsAndExperties,
  } = job;

  const payTypeText = payType === "HOURLY" ? "Hourly" : "Fixed Price";
  const renderProjectType = (projectType: ProjectType) => {
    switch (projectType) {
      case "MAINTAINANCE":
        return "Maintainance";
      case "NEW":
        return "New";
      case "ON_GOING":
        return "On Going";
      default:
        return "Unknown";
    }
  };
  const budgetText =
    payType === "HOURLY"
      ? `${perHourBudget} NEAR / hour`
      : `${fixedBudget} NEAR`;
  const renderLevelRequired = (levelRequired: LevelRequired) => {
    switch (levelRequired) {
      case "ENTRY":
        return "Entry";
      case "INTERMEDIATE":
        return "Intermediate";
      case "EXPERT":
        return "Expert";
      default:
        return "Unknown";
    }
  };

  return (
    <LinkBox {...rest}>
      <VStack
        alignItems="stretch"
        p={6}
        _hover={{
          bg: "green.50",
        }}
      >
        <Text fontSize="lg" fontWeight="semibold">
          {title}
        </Text>

        <Text fontSize="sm" color="gray.600">
          <b>{payTypeText}</b> - {renderLevelRequired(levelRequired)} level -
          Est. Budget: {budgetText} - Posted {moment(createdAt).fromNow()}
        </Text>

        <Text fontSize="sm">{content}</Text>

        <Spacer p={0.5} />

        <Wrap>
          {skillsAndExperties.map((skill) => (
            <WrapItem key={skill.id.toString()}>
              <Badge variant="rounded" colorScheme="blue">
                {skill.name}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </LinkBox>
  );
}

export default AppJobCard;
