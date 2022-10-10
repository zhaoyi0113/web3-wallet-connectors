import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadCSS } from 'fg-loadcss';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { Web3Provider } from './components/web3Provider';
import { web3 } from './utils/web3Util';

import { store } from './store';
import { listenOnEthereumEvents } from './features';
import { router } from './router';
import {
  RouterProvider,
} from "react-router-dom";
listenOnEthereumEvents(web3, store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
loadCSS('https://use.fontawesome.com/releases/v5.14.0/css/all.css');


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3Provider web3={web3}>
        {/* <App /> */}
        <RouterProvider router={router} />
      </Web3Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
