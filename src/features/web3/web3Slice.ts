import { createSlice } from '@reduxjs/toolkit';

export enum MetaMaskConnectionStatus {
  INIT,
  CONNECTED,
  NOT_INSTALL,
  FAILED,
}

export type Web3StoreState = {
  web3: {
    connection: { metaMask: MetaMaskConnectionStatus };
  };
};

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    connection: {
      metaMask: MetaMaskConnectionStatus.INIT,
    },
  },
  reducers: {
    connectMetaMask: (state, action) => {
      console.log('connect meta mask', action);
      state.connection.metaMask = action.payload;
    },
  },
});

export const { connectMetaMask } = web3Slice.actions;

export default web3Slice.reducer;
