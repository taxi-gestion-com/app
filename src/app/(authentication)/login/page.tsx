import { ReactNode } from 'react';
import { Metadata } from 'next';
import { appPageTitle } from '@/features/web';
import { LoginPage } from '@/features/authentication/presentation';

export const metadata: Metadata = {
  title: appPageTitle('Connexion')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;
  return <LoginPage username={username ?? ''} />;
};

export default Page;
