import { ReactNode } from 'react';
import { Metadata } from 'next';
import { LOGIN_KEY, loginMutation, LoginPage } from '@/features/authentication/use-cases/login';
import { appPageTitle } from '@/features/web';
import { ClientProvider } from '@/libraries/piqure';

export const metadata: Metadata = {
  title: appPageTitle('Connexion')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;

  return (
    <ClientProvider bind={LOGIN_KEY} to={loginMutation}>
      <LoginPage username={username ?? ''} />
    </ClientProvider>
  );
};

export default Page;
