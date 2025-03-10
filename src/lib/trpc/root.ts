import { headers } from 'next/headers';
import { initTRPC } from '@trpc/server';
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir';
import { db } from '@/db';

const createContextInner = async () => ({
  db,
  headers: await headers()
});

export type Context = Awaited<ReturnType<typeof createContextInner>>;

const trpc = initTRPC.context<Context>().create();

export const procedure = trpc.procedure.experimental_caller(
  experimental_nextAppDirCaller({
    createContext: createContextInner
  })
);
