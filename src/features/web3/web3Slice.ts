import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import Web3 from 'web3';

export enum MetaMaskConnectionStatus {
  INIT,
  CONNECTED,
  NOT_INSTALL,
  FAILED,
}

export type Web3StoreState = {
  web3: {
    connection: { metaMask: MetaMaskConnectionStatus };
    accounts: string[];
    currentAccount: { account: string; balance: string };
  };
};

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    connection: {
      metaMask: MetaMaskConnectionStatus.INIT,
    },
    accounts: [],
    currentAccount: {},
  },
  reducers: {
    connectMetaMask: (state, action) => {
      console.log('connect metamask', action);
      const currentAccount: any = {};
      if (action.payload.accounts.length > 0) {
        currentAccount.account = action.payload.accounts[0];
        currentAccount.balance = '';
      }
      return { ...state, connection: { metaMask: action.payload.connectionStatus }, accounts: action.payload.accounts, currentAccount };
    },
    getAccountBalance: (state, action) => {
      const { balance } = action.payload;
      const { currentAccount } = state;
      return { ...state, currentAccount: { ...currentAccount, balance } };
    },
  },
});

// actions

export const { connectMetaMask, getAccountBalance } = web3Slice.actions;

export const getAccountBalanceThunk = async (web3: Web3, dispatch: Dispatch<any>, account: string) => {
  if (account) {
    const balance = await web3.eth.getBalance(account);
    dispatch(getAccountBalance(balance));
  }
};

export default web3Slice.reducer;
