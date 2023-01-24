import {
  Box,
  Button,
  Card,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { env } from "../../../env/client.mjs";
import AppContainer from "../../components/AppContainer";
import AppJobCard from "../../components/AppJobCard";
import {
  selectAccountId,
  selectWallet,
} from "../../store/reducers/walletReducer";
import { useAppSelector } from "../../store/store";
import { HomeRight } from "./HomeRight";

function HomePage() {
  const wallet = useAppSelector(selectWallet);
  const accountId = useAppSelector(selectAccountId);

  useEffect(() => {
    if (accountId)
      wallet
        ?.viewMethod({
          contractId: env.NEXT_PUBLIC_CONTRACT_NAME,
          method: "get_status",
          args: {
            account_id: accountId,
          },
        })
        .then((res) => {
          console.log("get_status", res);
        });
  }, [accountId, wallet]);

  return (
    <>
      <AppContainer>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={3}>
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
                    <TabPanel p={0}>
                      <Box p={6}>
                        <Text>
                          Browse the most recent jobs that match your skills and
                          profile description to the skills clients are looking
                          for.
                        </Text>
                      </Box>
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
