import type { LinkProps } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

function AppLink({ children, ...props }: LinkProps) {
  return (
    <NextLink href={props.href || "#"} passHref legacyBehavior>
      <Link>{children}</Link>
    </NextLink>
  );
}

export default AppLink;
