import { authenticationProcedures } from '@/features/authentication';
import { router } from './root';

export const appRouter = router({
  ...authenticationProcedures
});

export type AppRouter = typeof appRouter;
