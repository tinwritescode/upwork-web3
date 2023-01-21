import React, { useEffect } from "react";
import DefaultLayout from "./DefaultLayout";
import { useRouter } from "next/router";
import { useAppSelector } from "../store/store";
import {
  selectIsConnected,
  selectIsLoading,
} from "../store/reducers/walletReducer";

function ProtectedLayout({ children }: { children: React.ReactElement }) {
  const isLoggedIn = useAppSelector(selectIsConnected);
  const isLoading = useAppSelector(selectIsLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (isLoading || !isLoggedIn) {
    return <div>Loading...</div>;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}

export default ProtectedLayout;
