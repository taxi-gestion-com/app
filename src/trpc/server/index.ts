import { experimental_lazy } from '@trpc/server';
import { router } from './root';

export const appRouter = router({
  authentication: experimental_lazy(() =>
    import('@/features/authentication/_trpc').then(({ authenticationRouter }) => authenticationRouter)
  )
});

export type AppRouter = typeof appRouter;
