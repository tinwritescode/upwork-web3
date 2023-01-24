import type { ContainerProps, StackProps } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Spacer, Container } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  containerProps?: StackProps;
} & ContainerProps;

function AppContainer({ children, containerProps, ...rest }: Props) {
  return (
    <Container maxW="6xl" {...rest} pb={20}>
      <Spacer p={3} />
      <Stack spacing={3} {...containerProps}>
        {children}
      </Stack>
    </Container>
  );
}

export default AppContainer;
