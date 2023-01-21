import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { memo } from "react";
import { SlLogout, SlWallet } from "react-icons/sl";
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

  const isWalletConnected = !!wallet?.accountId;

  return isWalletConnected ? (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<SlWallet />}>{wallet?.accountId}</Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Button
            onClick={() => wallet?.signOut()}
            leftIcon={<SlLogout />}
            colorScheme="red"
          >
            Disconnect
          </Button>
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
