import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Menu } from './menu';
import './App.css';
import { Web3Context } from './web3Provider';
import { TooBar } from './toolBar';
import { connectMetaMaskAction, getAccountBalanceAction, isMetaMaskConnectedAction, MetaMaskConnectionStatus, Web3StoreState } from '../features';
import { Alert } from './alert';
import Web3 from 'web3';

export const App = () => {
  const web3 = useContext(Web3Context);
  const metaMaskConnectionStatus = useSelector((state: Web3StoreState) => {
    return state.web3.connection.metaMaskStatus;
  });
  const currentAccount = useSelector((state: Web3StoreState) => state.web3.currentAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(isMetaMaskConnectedAction(web3));
  }, [currentAccount?.account]);

  if (web3) {
    web3.givenProvider.on('accountsChanged', (accounts: string[]) => {
      
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TooBar />
      <Menu />
      {metaMaskConnectionStatus === MetaMaskConnectionStatus.NOT_INSTALL ? (
        <Alert title="Error" message="Meta Mask is not installed on this browser" />
      ) : null}
      {metaMaskConnectionStatus === MetaMaskConnectionStatus.FAILED ? (
        <Alert title="Error" message="Failed to connect to Meta Mask" />
      ) : null}
    </div>
  );
};
