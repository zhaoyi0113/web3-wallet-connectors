import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { Menu } from './menu';
import './App.css';
import { Web3Context } from './web3Provider';
import { TooBar } from './toolBar';
import { MetaMaskConnectionStatus, Web3StoreState } from '../features';
import { Alert } from './alert';

export const App = () => {
  const web3 = useContext(Web3Context);
  const metaMaskConnection = useSelector((state: Web3StoreState) => {
    return state.web3.connection.metaMask;
  });

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
