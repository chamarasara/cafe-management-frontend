import React from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createRouter({ routeTree });
const client = new QueryClient();

const App = () => (
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
