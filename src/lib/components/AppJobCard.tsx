import {
  Badge,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { Job, ProjectType } from "@prisma/client";
import moment from "moment";

type Props = {
  href: string;
  job: Job;
};

function AppJobCard({ job, href }: Props) {
  const { title, projectType, payType, long, createdAt } = job;

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

  return (
    <LinkBox>
      <VStack
        alignItems="stretch"
        p={6}
        _hover={{
          bg: "green.50",
        }}
      >
        <LinkOverlay href={href}>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
        </LinkOverlay>

        <Text fontSize="sm" color="gray.600">
          <b>{payTypeText}</b> - Entry level - Est. Budget: $400 - Posted{" "}
          {moment(createdAt).fromNow()}
        </Text>

        <Text fontSize="sm">
          quick job for someone with the knowledge, i sent crypto to the
          platform by accident and need to retrieve it. If you cant do it please
          dont try.
        </Text>

        <Spacer p={0.5} />

        <Wrap>
          <WrapItem>
            <Badge variant="rounded">Blockchain</Badge>
          </WrapItem>
        </Wrap>
      </VStack>
    </LinkBox>
  );
}

export default AppJobCard;
