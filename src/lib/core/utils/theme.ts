import { badgeTheme } from "./theme/badge";
import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./theme/button";

export const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Badge: badgeTheme,
  },
});
