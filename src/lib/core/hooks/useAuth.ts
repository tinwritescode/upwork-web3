import { env } from "../../../env/client.mjs";
import { trpc } from "../utils/trpc";

export const useAuth = () => {
  const { data, isLoading } = trpc.auth.getSession.useQuery();
  // TODO: correct these
  const isActive = true;
  const isRightChainId = true;

  const logout = trpc.auth.logout.useMutation();

  return {
    isLoggedIn: data?.isLoggedIn && isActive,
    isWalletConnected: isActive,
    isRightChainId,
    logout,
    isLoading,
    walletAddress:
      (isActive && (window?.ethereum as any)?.selectedAddress) || null,
  };
};
