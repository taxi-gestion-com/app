import { ReactNode } from 'react';
import { Metadata } from 'next';
import { LoginPage } from '@/features/authentication';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Connexion')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;
  return <LoginPage username={username ?? ''} />;
};

export default Page;
