import { ReactNode } from 'react';
import { Metadata } from 'next';
import { LOGIN_KEY, loginMutation, LoginPage } from '@/features/authentication/use-cases/login';
import { appPageTitle } from '@/features/web';
import { guestOrRedirect } from '@/libraries/better-auth';
import { ClientProvider } from '@/libraries/piqure';

export const metadata: Metadata = {
  title: appPageTitle('Connexion')
};

const Page = async ({
  searchParams
}: {
  searchParams: Promise<{ username?: string; redirect?: string }>;
}): Promise<ReactNode> => {
  await guestOrRedirect();

  const { username, redirect } = await searchParams;

  return (
    <ClientProvider bind={LOGIN_KEY} to={loginMutation}>
      <LoginPage username={username} redirect={redirect} />
    </ClientProvider>
  );
};

export default Page;
