import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { web3 } from './utils';
import web3Reducer, { connectMetaMask, MetaMaskConnectionStatus } from './features/web3/web3Slice';


export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
  middleware: [thunkMiddleware]
});

// if (web3) {
//   web3.givenProvider
//     .enable()
//     .then((accounts: string[]) => {
//       store.dispatch(
//         connectMetaMask({
//           connectionStatus: web3?.givenProvider.isMetaMask ? MetaMaskConnectionStatus.CONNECTED : MetaMaskConnectionStatus.NOT_INSTALL,
//           accounts,
//         })
//       );
//     })
//     .catch(() => store.dispatch(connectMetaMask(MetaMaskConnectionStatus.FAILED)));
  
// } else {
//   console.error('web3 is not install.');
//   store.dispatch(connectMetaMask(MetaMaskConnectionStatus.NOT_INSTALL));
// }
