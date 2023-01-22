import { Box, Button, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AppContainer } from "../lib/components";

function Page404() {
  return (
    <AppContainer>
      <Stack>
        <Box>
          <Box textAlign="center">
            <FourZeroFourBackground />
            <FourZeroFourContent />
          </Box>
        </Box>
      </Stack>
    </AppContainer>
  );
}

export default Page404;

function FourZeroFourBackground() {
  return (
    <div className="four_zero_four_bg">
      <h1>404</h1>
      <style jsx>{`
        .four_zero_four_bg {
          background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
          height: 400px;
          background-position: center;
        }

        .four_zero_four_bg h1 {
          font-size: 80px;
        }
      `}</style>
    </div>
  );
}

function FourZeroFourContent() {
  return (
    <div className="contant_box_404">
      <Heading>Look like you&apos;re lost</Heading>

      <Text>the page you are looking for not avaible!</Text>

      <Spacer p={2} />

      <Link href="/" className="link_404">
        <Button colorScheme="green">Go to Home</Button>
      </Link>

      <style jsx>{`
        .contant_box_404 {
          margin-top: -50px;
        }

        .link_404 {
          color: #fff !important;
          padding: 10px 20px;
          background: #39ac31;
          margin: 20px 0;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
