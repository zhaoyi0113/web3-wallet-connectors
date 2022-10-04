import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Menu } from './menu';
import './App.css';
import { Web3Context } from './web3Provider';
import { TooBar } from './toolBar';
import { getAccountBalanceThunk, MetaMaskConnectionStatus, Web3StoreState } from '../features';
import { Alert } from './alert';
import Web3 from 'web3';

export const App = () => {
  const web3 = useContext(Web3Context);
  const metaMaskConnection = useSelector((state: Web3StoreState) => {
    return state.web3.connection.metaMask;
  });
  const currentAccount = useSelector((state: Web3StoreState) => state.web3.currentAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (web3 && currentAccount) {
      getAccountBalanceThunk(web3, dispatch, currentAccount.account);
    }
  }, [currentAccount?.account]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TooBar />
      <Menu />
      {metaMaskConnection === MetaMaskConnectionStatus.NOT_INSTALL ? (
        <Alert title="Error" message="Meta Mask is not installed on this browser" />
      ) : null}
      {metaMaskConnection === MetaMaskConnectionStatus.FAILED ? <Alert title="Error" message="Failed to connect to Meta Mask" /> : null}
    </div>
  );
};
