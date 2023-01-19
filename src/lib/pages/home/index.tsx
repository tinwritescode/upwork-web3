import {
  Box,
  Flex,
  Heading,
  Img,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import localFont from "@next/font/local";
import Link from "next/link";
import AppButton from "../../components/AppButton";
import EmptyLayout from "../../layouts/EmptyLayout";

const modeSevens = localFont({
  src: "../../../../public/fonts/ModeSeven.ttf",
  preload: true,
  display: "block",
});

function HomePage() {
  const [smallerThan750] = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <Box></Box>
    </>
  );
}

export default HomePage;

HomePage.title = "Upwork Landing Page";
