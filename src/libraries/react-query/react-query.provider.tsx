'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 }
    }
  });

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient: QueryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
