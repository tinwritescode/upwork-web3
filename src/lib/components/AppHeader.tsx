import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiMessage } from "react-icons/bi";
import { FaPeopleCarry, FaTasks } from "react-icons/fa";
import { IoHelp, IoSearch } from "react-icons/io5";
import { RxBell, RxChevronDown } from "react-icons/rx";
import NextLink from "next/link";

export function AppHeader({}) {
  const links = [
    {
      label: "Find work",
      items: [
        { label: "Find work", href: "/find-work" },
        { label: "Saved jobs", href: "/saved-jobs" },
        { label: "Proposals", href: "/proposals" },
        { label: "Profile", href: "/profile" },
        { label: "My stats", href: "/stats" },
        { label: "My project dashboard", href: "/project-dashboard" },
      ],
    },
    {
      label: "My jobs",
      items: [
        { label: "My jobs", href: "/my-jobs/" },
        { label: "All contracts", href: "/my-jobs/all-contracts" },
        { label: "Work diary", href: "/my-jobs/work-diary" },
      ],
    },
    {
      label: "Report",
      items: [
        { label: "Overview", href: "/report/overview" },
        { label: "My reports", href: "/report/my-reports" },
        {
          label: "Billings and Earnings",
          href: "/report/billings-and-earnings",
        },
        { label: "Connects History", href: "/report/connects-history" },
        { label: "Transaction History", href: "/report/transaction-history" },
        {
          label: "Certificate of Earnings",
          href: "/report/certificate-of-earnings",
        },
      ],
    },
    {
      label: "Messages",
      href: "/messages",
      items: [],
    },
  ];

  return (
    <Box
      as="header"
      position="sticky"
      px={6}
      pb={2}
      top={0}
      zIndex={10}
      bgColor="white"
    >
      <Spacer p={2} />
      <HStack gap={4}>
        <NextLink href="/">
          <Heading size="md">Freelancer</Heading>
        </NextLink>

        <Flex gap={4} display={{ base: "none", md: "flex" }}>
          {links.map((link) => {
            const isCurrentUrl = link.items.some((item) => {
              return RegExp(`^${item.href}`).test(window.location.pathname);
            });

            return (
              <Popover
                trigger="hover"
                key={link.label}
                openDelay={100}
                closeDelay={100}
                gutter={14}
              >
                <PopoverTrigger>
                  <Button
                    variant="link"
                    textAlign="left"
                    fontWeight="medium"
                    color={isCurrentUrl ? "blue.500" : "gray.800"}
                  >
                    {link.label}

                    <Box as="span" ml={1} />

                    {link.items.length > 0 && <RxChevronDown />}
                  </Button>
                </PopoverTrigger>
                {link.items.length > 0 && (
                  <PopoverContent shadow="xl" fontSize="sm">
                    <PopoverArrow />
                    <VStack alignItems="stretch">
                      <Spacer p={0.25} />
                      {link.items.map((item) => {
                        return (
                          <Link
                            fontWeight="medium"
                            key={item.label}
                            color="gray.800"
                            p={2}
                            px={4}
                            _hover={{
                              bgColor: "gray.100",
                            }}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                      <Spacer p={0.25} />
                    </VStack>
                  </PopoverContent>
                )}
              </Popover>
            );
          })}
        </Flex>

        <Spacer />

        <SearchInput display={{ base: "none", md: "block" }} />

        {/* ? */}
        <IconButton aria-label="Help" variant="ghost">
          <IoHelp size={24} />
        </IconButton>

        <IconButton aria-label="Message" variant="ghost">
          <BiMessage size={20} />
        </IconButton>

        {/* Notification */}
        <IconButton aria-label="Notification" variant="ghost">
          <RxBell size={20} />
        </IconButton>
      </HStack>
    </Box>
  );
}

function SearchInput({ ...rest }: InputGroupProps) {
  const findLinks = [
    {
      label: "Jobs",
      description: "Find jobs posted by clients",
      icon: <FaTasks />,
    },
    {
      label: "Talents",
      description: "Find freelancers to hire",
      icon: <FaPeopleCarry />,
    },
    {
      label: "Projects",
      description: "See projects by others freelancers",
      icon: <FaPeopleCarry />,
    },
  ];
  return (
    <InputGroup maxW="sm" {...rest}>
      <InputLeftElement pointerEvents="none">
        <IoSearch />
      </InputLeftElement>

      <Input rounded="full" type="text" placeholder="Search" pr={20} />

      <InputRightElement w="20">
        <Popover>
          <PopoverTrigger>
            <Button fontWeight="semibold" size="sm" rounded="full">
              Jobs <RxChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <VStack alignItems="stretch">
                {findLinks.map((link) => {
                  return (
                    <HStack gap={1} key={link.label}>
                      {link.icon}
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold">
                          {link.label}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {link.description}
                        </Text>
                      </Box>
                    </HStack>
                  );
                })}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </InputRightElement>
    </InputGroup>
  );
}
