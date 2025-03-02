import { createTRPCContext } from '@trpc/tanstack-react-query';
import { type AppRouter } from '@/trpc/server';

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
