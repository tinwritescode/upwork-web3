import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormLabel,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { trpc } from "../../core/utils/trpc";

const EXAMPLE_ADDRESS = "0x123";

function TestSection() {
  const utils = trpc.useContext();
  const { mutateAsync: loginAsync, isLoading: isLoggingIn } =
    trpc.auth.login.useMutation({
      onSuccess: () => {
        utils.auth.invalidate();
      },
    });
  const { mutateAsync: logoutAsync, isLoading: isLoggingOut } =
    trpc.auth.logout.useMutation({
      onSuccess: () => {
        utils.auth.invalidate();
      },
    });
  const { data: session } = trpc.auth.getSession.useQuery();
  const { data: client } = trpc.appClient.getClientInfo.useQuery();
  const { mutateAsync: registerClientAsync, isLoading: isRegisteringClient } =
    trpc.appClient.registerClient.useMutation();

  const onLoginClicked = async () => {
    await loginAsync({
      address: EXAMPLE_ADDRESS,
    });
  };

  const onSessionLogoutClicked = async () => {
    await logoutAsync();
  };

  const onRegisterClientClicked = async () => {
    if (!session?.isLoggedIn) {
      throw new Error("Not logged in");
    }

    const data = await registerClientAsync({
      name: "Tin N.",
    });

    console.table([data]);
  };

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="md">Test Section</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        {session?.isLoggedIn === true ? (
          <Stack>
            <Text>Logged in as {session.address}</Text>

            <Button
              onClick={onRegisterClientClicked}
              disabled={!!client?.userAddress}
              isLoading={isRegisteringClient}
              loadingText="Registering..."
            >
              {client?.userAddress ? "Client Registered" : "Register Client"}
            </Button>
            <FormLabel fontSize="sm" pl={2}>
              You are {client?.userAddress ? "registered" : "not registered"} as
              a client
            </FormLabel>

            {client?.userAddress && (
              <Link href="/jobs/create">
                <Button colorScheme="green" w="full">
                  Create a job
                </Button>
              </Link>
            )}

            <Button
              onClick={onSessionLogoutClicked}
              isLoading={isLoggingOut}
              loadingText="Logging out..."
            >
              Logout (session)
            </Button>
          </Stack>
        ) : (
          <Button
            onClick={onLoginClicked}
            isLoading={isLoggingIn}
            loadingText="Logging in..."
          >
            Login
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

export default TestSection;
