import { badgeTheme } from "./theme/badge";
import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./theme/button";

export const theme = extendTheme({
  // font
  fonts: {
    heading: "Neue Montreal, apple-system, sans-serif",
    body: "Neue Montreal, apple-system, sans-serif",
  },
  components: {
    Button: buttonTheme,
    Badge: badgeTheme,
  },
});
