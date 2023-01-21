import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, theme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({});

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    focusBorderColor: theme.colors.green[500],
  },
});
