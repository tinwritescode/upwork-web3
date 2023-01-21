import { ChakraProvider } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { env } from "../../../env/client.mjs";
import { initWallet } from "../../store/reducers/walletReducer";
import { useAppDispatch } from "../../store/store";
import { theme } from "../utils/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      initWallet({
        contractId: env.NEXT_PUBLIC_CONTRACT_NAME,
        network: "testnet",
      })
    );
  }, []);

  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};

export default memo(Providers);
