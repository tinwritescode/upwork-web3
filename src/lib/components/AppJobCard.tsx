import {
  Box,
  Text,
  Heading,
  FormHelperText,
  VStack,
  HStack,
  Badge,
  Flex,
  Wrap,
  WrapItem,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
};

function AppJobCard({ title }: Props) {
  return (
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
        <b>Fixed-price</b> - Entry level - Est. Budget: $400 - Posted 12 hours
        ago
      </Text>

      <Text fontSize="sm">
        quick job for someone with the knowledge, i sent crypto to the platform
        by accident and need to retrieve it. If you cant do it please dont try.
      </Text>

      <Spacer p={0.5} />

      <Wrap>
        <WrapItem>
          <Badge variant="rounded">Blockchain</Badge>
        </WrapItem>
      </Wrap>
    </VStack>
  );
}

export default AppJobCard;
