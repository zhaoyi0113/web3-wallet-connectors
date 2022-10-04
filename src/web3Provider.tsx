import Web3 from 'web3';
import React, { createContext, useContext } from 'react';
import { web3 } from './web3Util';

export const Web3Context = createContext(web3);

export const Web3Provider = ({ web3, children }: { web3: Web3 | null; children: JSX.Element }) => {
  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};
