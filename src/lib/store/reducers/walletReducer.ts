import type { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Wallet } from "../../core/utils/near-wallet";

type WalletState = {
  wallet: Wallet | null;
  isLoading: boolean;
};

const initialState: WalletState = {
  wallet: null,
  isLoading: true,
};

export const initWallet = createAsyncThunk("wallet/init", async () => {
  const wallet = new Wallet();

  await wallet.startUp();

  return wallet;
});

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    logout: (state) => {
      state.wallet = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initWallet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(initWallet.fulfilled, (state, action) => {
      if (!state.wallet) state.wallet = action.payload;

      state.isLoading = false;
    });
    builder.addCase(initWallet.rejected, (state) => {
      state.wallet = null;
    });
  },
});

export const { logout } = walletSlice.actions;
export default walletSlice.reducer;

export const selectWallet = (state: RootState): Wallet | null =>
  state.wallet.wallet;
export const selectAccountId = (state: RootState): string | undefined =>
  state.wallet.wallet?.accountId;
export const selectIsConnected = (state: RootState): boolean =>
  !!state.wallet.wallet?.accountId;
export const selectIsLoading = (state: RootState): boolean =>
  state.wallet.isLoading;
