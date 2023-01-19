import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const rounded = defineStyle({
  textTransform: "capitalize",
  bg: "gray.200",
  textColor: "green.800",
  px: 2,
  fontWeight: "semibold",
  rounded: "full",
});

export const badgeTheme = defineStyleConfig({
  variants: { rounded },
});
