import React from 'react';
const Home = React.lazy(() => import('../pages/Home'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

export const routes = [
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
];
