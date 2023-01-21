import {
  Button,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { SlLogout, SlSettings, SlWallet } from "react-icons/sl";
import { selectWallet } from "../store/reducers/walletReducer";
import { useAppSelector } from "../store/store";

function ConnectWalletButton() {
  const wallet = useAppSelector(selectWallet);
  const toast = useToast();
  const onConnectWalletClicked = async () => {
    if (!wallet)
      return toast({
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      });

    if (wallet.accountId) {
      return toast({
        title: "Wallet already connected",
        status: "info",
      });
    }

    wallet.signIn();
  };
  const links = [
    {
      label: "Settings",
      href: "/settings",
      icon: <SlSettings />,
      colorScheme: "blue",
    },
    {
      label: "Disconnect",
      href: "/",
      icon: <SlLogout />,
      onClick: () => wallet?.signOut(),
      colorScheme: "red",
    },
  ];

  const isWalletConnected = !!wallet?.accountId;

  return isWalletConnected ? (
    <Popover>
      <PopoverTrigger>
        <Button size={{ base: "sm", md: "md" }} leftIcon={<SlWallet />}>
          {wallet?.accountId}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                <Button
                  onClick={link.onClick}
                  leftIcon={link.icon}
                  colorScheme={link.colorScheme}
                  variant="link"
                  size={{ base: "sm", md: "md" }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <Button onClick={onConnectWalletClicked} leftIcon={<SlWallet />}>
      Connect Wallet
    </Button>
  );
}

export default memo(ConnectWalletButton);
