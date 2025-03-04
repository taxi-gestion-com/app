import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createContext } from '@/trpc/server';

const handler = (req: Request, res: Response): Promise<Response> => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext({ req, res })
  });
};

export { handler as GET, handler as POST };
