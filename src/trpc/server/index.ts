import { authenticationRouter } from '@/features/authentication/_trpc';
import { router } from './root';

export const appRouter = router({
  authentication: authenticationRouter
});

export type AppRouter = typeof appRouter;
