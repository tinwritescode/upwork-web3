import { Box, Spacer, useMediaQuery } from "@chakra-ui/react";

export function AppHeader({}) {
  const links = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Community", href: "/community" },
  ];
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");

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
    </Box>
  );
}
