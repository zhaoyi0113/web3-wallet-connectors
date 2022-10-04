import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadCSS } from 'fg-loadcss';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Web3Provider } from './web3Provider';
import { web3 } from './web3Util';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
loadCSS(
  'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
);
root.render(
  <React.StrictMode>
    <Web3Provider web3={web3}>
      <App />
    </Web3Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
