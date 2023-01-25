import {
  Box,
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import { Paginate } from "react-paginate-chakra-ui";
import slugify from "slugify";
import { env } from "../../../env/client.mjs";
import AppContainer from "../../components/AppContainer";
import AppJobCard from "../../components/AppJobCard";
import { useLimit } from "../../core/hooks/useLimit";
import { trpc } from "../../core/utils/trpc";
import {
  selectAccountId,
  selectWallet,
} from "../../store/reducers/walletReducer";
import { useAppSelector } from "../../store/store";
import { HomeRight } from "./HomeRight";

const INITIAL_LIMIT = 10;

function HomePage() {
  const wallet = useAppSelector(selectWallet);
  const accountId = useAppSelector(selectAccountId);
  const { limit, setLimit } = useLimit(INITIAL_LIMIT);
  const [offset, setOffset] = useState(0);
  const { data: jobList, isLoading: isJobListLoading } =
    trpc.job.getJobs.useQuery({
      limit: limit,
      offset,
    });
  const router = useRouter();

  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  useEffect(() => {
    if (router.query.page && Number(router.query.page) > 1) {
      setOffset((Number(router.query.page) - 1) * limit);
    }
  }, [limit, router.query.page]);

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

                      {isJobListLoading && (
                        <Stack spacing={3}>
                          {Array.from({ length: 10 }).map((_, i) => (
                            <Box px={6} key={i}>
                              <Skeleton height="100px" rounded="md" />
                            </Box>
                          ))}
                        </Stack>
                      )}

                      {jobList?.jobs.map((job) => (
                        <AppJobCard
                          href={`/jobs/${slugify(job.title)}-${job.id}`}
                          key={job.id.toString()}
                          job={job}
                          onClick={() => {
                            onOpen();
                          }}
                        />
                      ))}

                      <Paginate
                        page={router.query.page || 1}
                        count={jobList?.total || 0}
                        onPageChange={(page: any) => {
                          router.push(
                            {
                              query: {
                                page: page,
                              },
                            },
                            undefined,
                            { shallow: true }
                          );
                        }}
                        pageSize={limit}
                      />
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

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Blog</DrawerHeader>
          <DrawerBody>
            <DrawerCloseButton />
            <DrawerFooter>
              <Button variant="outline" mr={3}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default HomePage;

HomePage.title = "Upwork Landing Page";
