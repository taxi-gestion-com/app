import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SIGN_IN_KEY, SignInPage, signInMutation } from '@/features/authentication/use-cases/sign-in';
import { appPageTitle } from '@/features/web';
import { guestOrRedirect } from '@/libraries/better-auth';
import { ClientProvider } from '@/libraries/piqure';

export const metadata: Metadata = {
  title: appPageTitle()('Connexion')
};

type SearchParams = { username?: string; redirect?: string };

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<ReactNode> => {
  await guestOrRedirect();

  const { username, redirect } = await searchParams;

  return (
    <ClientProvider bind={SIGN_IN_KEY} to={signInMutation}>
      <SignInPage username={username} redirect={redirect} />
    </ClientProvider>
  );
};

export default Page;
