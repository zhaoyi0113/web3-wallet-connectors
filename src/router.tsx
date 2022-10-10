import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { Account } from './components/account';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'account/:account',
        element: <Account></Account>,
      },
    ],
  },
]);
