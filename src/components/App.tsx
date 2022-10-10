import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { Menu } from './menu';
import './App.css';
import { Web3Context } from './web3Provider';
import { TooBar } from './toolBar';
import { isMetaMaskConnectedAction, MetaMaskConnectionStatus, Web3StoreState } from '../features';
import { Alert } from './alert';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    web3.givenProvider.on('accountsChanged', (accounts: string[]) => {});
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TooBar />
        <Menu />
        <Container maxWidth="sm">
          <Outlet />
        </Container>
        {metaMaskConnectionStatus === MetaMaskConnectionStatus.NOT_INSTALL ? (
          <Alert title="Error" message="Meta Mask is not installed on this browser" />
        ) : null}
        {metaMaskConnectionStatus === MetaMaskConnectionStatus.FAILED ? (
          <Alert title="Error" message="Failed to connect to Meta Mask" />
        ) : null}
      </div>
    </ThemeProvider>
  );
};
