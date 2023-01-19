import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  GridItem,
  Heading,
  Img,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import localFont from "@next/font/local";
import Link from "next/link";
import AppButton from "../../components/AppButton";
import AppContainer from "../../components/AppContainer";
import AppJobCard from "../../components/AppJobCard";
import EmptyLayout from "../../layouts/EmptyLayout";

const modeSevens = localFont({
  src: "../../../../public/fonts/ModeSeven.ttf",
  preload: true,
  display: "block",
});

function HomePage() {
  const [smallerThan750] = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <AppContainer>
        <SimpleGrid columns={4} gap={3}>
          <GridItem colSpan={3}>
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
      <Card variant="outline">
        <CardBody>
          <Avatar src="https://bit.ly/tioluwani-kolawole" />
          <Spacer p={1} />
          <Heading size="md">Tin N.</Heading>
        </CardBody>
      </Card>
    </GridItem>
  );
}
