import { createSlice, EnhancedStore } from '@reduxjs/toolkit';
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
    connection: { metaMaskStatus: MetaMaskConnectionStatus };
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

export const getAccountBalanceAction = (web3: Web3 | null, currentAccount: any) => {
  return async (dispatch: Dispatch<any>) => {
    if (web3 && currentAccount.account) {
      const balance = await web3.eth.getBalance(currentAccount.account);
      dispatch(getAccountBalance({ balance }));
    }
  };
};

const dispatchMetaMaskAccounts = async (web3: Web3 | null, dispatch: Dispatch<any>, accounts: string[]) => {
  if (accounts) {
    dispatch(
      connectMetaMask({
        connectionStatus: web3?.givenProvider.isMetaMask ? MetaMaskConnectionStatus.CONNECTED : MetaMaskConnectionStatus.NOT_INSTALL,
        accounts,
      })
    );
    const balance = await web3?.eth.getBalance(accounts[0]);
    dispatch(getAccountBalance({ balance }));
  }
};

export const connectMetaMaskAction = (web3: Web3 | null) => async (dispatch: Dispatch<any>) => {
  try {
    console.log('is metamask', web3?.givenProvider.isMetaMask);
    const accounts = await web3?.givenProvider.request({
      method: 'eth_requestAccounts',
    });
    await dispatchMetaMaskAccounts(web3, dispatch, accounts);
  } catch (err) {
    console.error(err);
    dispatch(connectMetaMask({ connectionStatus: MetaMaskConnectionStatus.FAILED, accounts: [] }));
  }
};

export const isMetaMaskConnectedAction = (web3: Web3 | null) => async (dispatch: Dispatch<any>) => {
  try {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_accounts',
    });
    await dispatchMetaMaskAccounts(web3, dispatch, accounts);
  } catch (err) {
    console.error(err);
  }
};

export const listenOnEthereumEvents = (web3: Web3 | null, store: any) => {
  const changeHandler = (newAccounts: string[]) => {
    console.log('account changed', newAccounts);
    store.dispatch(isMetaMaskConnectedAction(web3));
  }
  web3?.givenProvider.on('accountsChanged', changeHandler);
  web3?.givenProvider.on('networkChanged', changeHandler);
  web3?.givenProvider.on('chainChanged', changeHandler);
};

export default web3Slice.reducer;
