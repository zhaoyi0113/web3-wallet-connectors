import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import { App } from './components/App';
import { Account } from './components/account';
import { DeployContract } from './components/deployContract';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'account/:account',
        element: <Account></Account>,
      },
      {
        path: 'contract/deploy-contract',
        element: <DeployContract></DeployContract>
      }
    ],
  },
]);
