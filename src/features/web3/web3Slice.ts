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
    currentAccount: { account: string; balance: string; transactionCount: number };
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
    setAccountInfo: (state, action) => {
      const { balance, transactionCount } = action.payload;
      const { currentAccount } = state;
      return { ...state, currentAccount: { ...currentAccount, balance, transactionCount } };
    },
    setNetworkChainId: (state, action) => {
      const { networkId, chainId } = action.payload;
      return { ...state, networkId, chainId };
    },
  },
});

// actions

export const { connectMetaMask, setAccountInfo } = web3Slice.actions;

const dispatchMetaMaskAccounts = async (web3: Web3 | null, dispatch: Dispatch<any>, accounts: string[]) => {
  if (accounts && accounts.length > 0) {
    dispatch(
      connectMetaMask({
        connectionStatus: web3?.givenProvider.isMetaMask ? MetaMaskConnectionStatus.CONNECTED : MetaMaskConnectionStatus.NOT_INSTALL,
        accounts,
      })
    );
    const balance = await web3?.eth.getBalance(accounts[0]);
    const transactionCount = await web3?.eth.getTransactionCount(accounts[0]);
    // const asset = await web3?.givenProvider.request({
    //   method: 'wallet_watchAsset',
    //   params: {
    //     type: 'ERC20',
    //     options: {
    //       address: accounts[0],
    //       symbol: 'WONE',
    //       decimals: 18,
    //       // image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11696.png',
    //     },
    //   },
    // });
    // console.log('get assets:', asset);
    dispatch(setAccountInfo({ balance, transactionCount }));
  } else {
    console.warn('cant get accounts');
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
    console.log('get accounts:', accounts);
    await dispatchMetaMaskAccounts(web3, dispatch, accounts);
  } catch (err) {
    console.error(err);
  }
};

export const listenOnEthereumEvents = (web3: Web3 | null, store: any) => {
  const changeHandler = (newAccounts: string[]) => {
    console.log('account changed', newAccounts);
    store.dispatch(isMetaMaskConnectedAction(web3));
  };
  web3?.givenProvider.on('accountsChanged', changeHandler);
  web3?.givenProvider.on('networkChanged', changeHandler);
  web3?.givenProvider.on('chainChanged', changeHandler);
};

export default web3Slice.reducer;
