import { configureStore } from '@reduxjs/toolkit';
import { web3 } from './utils';
import web3Reducer, { connectMetaMask, MetaMaskConnectionStatus } from './features/web3/web3Slice';

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
});

if (web3) {
  web3.givenProvider
    .enable()
    .then(() => {
      store.dispatch(
        connectMetaMask(web3?.givenProvider.isMetaMask ? MetaMaskConnectionStatus.CONNECTED : MetaMaskConnectionStatus.NOT_INSTALL)
      );
    })
    .catch(() => store.dispatch(connectMetaMask(MetaMaskConnectionStatus.FAILED)));
} else {
  console.error('web3 is not install.');
  store.dispatch(connectMetaMask(MetaMaskConnectionStatus.NOT_INSTALL));
}
