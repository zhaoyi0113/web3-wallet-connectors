import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import web3Reducer from './features/web3/web3Slice';

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
  middleware: [thunkMiddleware],
});
