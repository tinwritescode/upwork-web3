import {
  GridItem,
  Stack,
  Card,
  CardBody,
  VStack,
  Avatar,
  Spacer,
  Text,
  Heading,
  Progress,
  CardHeader,
  Divider,
} from "@chakra-ui/react";
import { AppLink } from "../../components";
import TestSection from "./TestSection";

export function HomeRight({}) {
  return (
    <GridItem>
      <Stack>
        <Card variant="outline">
          <CardBody>
            <VStack>
              <Avatar src="https://bit.ly/tioluwani-kolawole" />
              <Spacer p={1} />
              <Heading size="md">Tin N.</Heading>
              <Text noOfLines={2} textAlign="center" fontSize="sm">
                Energy & Mechanical Engineering | Blockchain Architecture,
                Blockchain
              </Text>
            </VStack>
          </CardBody>

          <Spacer p={1} />

          <CardBody w="full" bg="green.50">
            <Stack>
              <Heading size="sm" fontWeight="semibold">
                Profile completeness:
              </Heading>
              <Spacer p={0.25} />

              <Progress value={60} size="xs" w="100%" colorScheme="green" />
            </Stack>
          </CardBody>
        </Card>

        {/* TODO: test only, remove later */}
        <TestSection />

        <Card variant="outline">
          <CardHeader>
            <Heading size="md">Proposals</Heading>
            <AppLink href="/my-proposals">My Proposal</AppLink>
          </CardHeader>
          <Divider />
          <CardBody fontSize="sm">
            <Text>
              Looking for work? Browse jobs and get started on a proposal.
            </Text>
          </CardBody>
        </Card>
      </Stack>
    </GridItem>
  );
}
