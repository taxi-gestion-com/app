import type { ReactNode } from 'react';
import { HomePage } from '@/features/brand';
import { getSession } from '@/libraries/better-auth';

const Page = async (): Promise<ReactNode> => {
  const session = await getSession();

  return <HomePage isLoggedIn={session != null} />;
};

export default Page;
