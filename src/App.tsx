import './styles/common.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
