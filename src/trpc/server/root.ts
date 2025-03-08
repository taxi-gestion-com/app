import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';

export const { procedure, router } = initTRPC.context<Context>().create({
  transformer: superjson
});
