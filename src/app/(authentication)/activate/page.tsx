import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ACTIVATE_KEY, ActivatePage, activateMutation } from '@/features/authentication/use-cases';
import { appPageTitle } from '@/features/web';
import { guestOrRedirect } from '@/libraries/better-auth';
import { ClientProvider } from '@/libraries/piqure';

export const metadata: Metadata = {
  title: appPageTitle()('Activez votre compte')
};

type SearchParams = { email?: string; token?: string };

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<ReactNode> => {
  await guestOrRedirect();

  const { email, token } = await searchParams;

  return (
    <ClientProvider bind={ACTIVATE_KEY} to={activateMutation}>
      <ActivatePage email={email} token={token} />
    </ClientProvider>
  );
};

export default Page;
