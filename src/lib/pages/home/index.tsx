import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  GridItem,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import localFont from "@next/font/local";
import Link from "next/link";
import AppContainer from "../../components/AppContainer";
import AppJobCard from "../../components/AppJobCard";
import AppLink from "../../components/AppLink";

function HomePage() {
  const [smallerThan750] = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <AppContainer>
        <SimpleGrid columns={4} gap={3}>
          <GridItem colSpan={3}>
            <Stack
              bgColor="blue.500"
              minH={20}
              rounded="xl"
              p={4}
              textColor="white"
            >
              <Heading fontWeight="semibold" size="md">
                Learn how to get started with Upwork
              </Heading>
              <HStack>
                <Text>
                  Upwork 101 will guide you through the basics of our platform:
                  setting up your profile, submitting proposals and how to grow
                  your business.
                </Text>
              </HStack>
              <Button colorScheme="green" size="sm" maxW="fit-content">
                Explore upwork 101
              </Button>
            </Stack>

            <Spacer p={2} />

            <Card variant="outline">
              <>
                <Heading fontWeight="semibold" size="md" p={5}>
                  Jobs you might like
                </Heading>

                <Tabs>
                  <TabList px={6}>
                    <Tab>Best Matches</Tab>
                    <Tab>Most Recent</Tab>
                    <Tab>Saved Jobs</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel p={0}>
                      <Box p={6}>
                        <Text>
                          Browse jobs that match your experience to a
                          client&apos;s hiring preferences. Ordered by most
                          relevant.
                        </Text>
                      </Box>

                      <Link href="/jobs">
                        <AppJobCard title="Retrieve Crypto from Platform" />
                      </Link>
                    </TabPanel>
                    <TabPanel>
                      <Text>
                        Browse the most recent jobs that match your skills and
                        profile description to the skills clients are looking
                        for.
                      </Text>
                    </TabPanel>
                    <TabPanel></TabPanel>
                  </TabPanels>
                </Tabs>
              </>
            </Card>
          </GridItem>

          <HomeRight />
        </SimpleGrid>
      </AppContainer>
    </>
  );
}

export default HomePage;

HomePage.title = "Upwork Landing Page";

function HomeRight({}) {
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
