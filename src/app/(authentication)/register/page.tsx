import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ClientProvider } from '@/libraries/piqure';
import { REGISTER_KEY, registerMutation, RegisterPage } from '@/features/authentication/use-cases/register';
import { appPageTitle } from '@/features/web';
import { guestOrRedirect } from '@/libraries/better-auth';

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
