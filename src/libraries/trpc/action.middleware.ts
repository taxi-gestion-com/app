import type { MiddlewareResult } from '@trpc/server/unstable-core-do-not-import';

type MiddlewareOptions<Ctx> = {
  ctx: Ctx;
  next: (opts: { ctx: Ctx }) => Promise<MiddlewareResult<Ctx>>;
};

export const withActions = <Ctx, Actions extends Record<string, (ctx: Ctx) => unknown>>(actions: Actions) => {
  type Injected = {
    [K in keyof Actions]: ReturnType<Actions[K]>;
  };

  return (opts: MiddlewareOptions<Ctx>): Promise<MiddlewareResult<Ctx & Injected>> => {
    const injected = Object.fromEntries(Object.entries(actions).map(([k, fn]) => [k, fn(opts.ctx)])) as Injected;

    return opts.next({
      ctx: {
        ...opts.ctx,
        ...injected
      }
    });
  };
};
