import { initTRPC } from '@trpc/server';
import { Context } from './context';

export const { procedure, router } = initTRPC.context<Context>().create();
