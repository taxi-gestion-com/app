import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { REGISTER_KEY, RegisterPage, registerMutation } from '@/features/authentication/use-cases/register';
import { appPageTitle } from '@/features/web';
import { guestOrRedirect } from '@/libraries/better-auth';
import { ClientProvider } from '@/libraries/piqure';

export const metadata: Metadata = {
  title: appPageTitle('Créez votre compte')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  await guestOrRedirect();

  const { username } = await searchParams;

  return (
    <ClientProvider bind={REGISTER_KEY} to={registerMutation}>
      <RegisterPage username={username ?? ''} />
    </ClientProvider>
  );
};

export default Page;
