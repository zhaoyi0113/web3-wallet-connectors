import React, { useContext, useState, useEffect } from 'react';

import { Menu } from './menu';
import './App.css';
import { Web3Context } from './web3Provider';
import { TooBar  } from './toolBar';

export const App = () => {
  const web3 = useContext(Web3Context);
  const [open, setOpen] = useState(true);
  const [metaMaskConnected, setMetaMaskConnected] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {});

  web3?.givenProvider
    .enable()
    .then(() => setMetaMaskConnected(web3?.givenProvider.isMetaMask))
    .catch(() => setMetaMaskConnected(false));

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <TooBar />
      <Menu />
    </div>
  );
};
