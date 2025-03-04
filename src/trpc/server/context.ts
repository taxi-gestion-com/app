import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { db } from '@/db';

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: string | null;
}

export const createContextInner = async (opts?: CreateInnerContextOptions) => ({
  db,
  session: opts?.session
});

export const createContext = async ({ req, res }: { req: Request; res: Response }) => {
  const session = req.headers.get('authorization');
  const contextInner = await createContextInner({ session });

  return {
    ...contextInner,
    req,
    res
  };
};
export type Context = Awaited<ReturnType<typeof createContextInner>>;
