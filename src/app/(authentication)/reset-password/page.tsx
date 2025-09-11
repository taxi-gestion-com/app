import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { RESET_PASSWORD_KEY, ResetPasswordPage, resetPasswordMutation } from '@/features/authentication/use-cases';
import { appPageTitle } from '@/features/web';
import { guestOrRedirect } from '@/libraries/better-auth';
import { ClientProvider } from '@/libraries/piqure';

export const metadata: Metadata = {
  title: appPageTitle()('Réinitialiser votre mot de passe')
};

type SearchParams = { email?: string; token?: string };

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<ReactNode> => {
  await guestOrRedirect();

  const { email, token } = await searchParams;

  return (
    <ClientProvider bind={RESET_PASSWORD_KEY} to={resetPasswordMutation}>
      <ResetPasswordPage email={email} token={token} />
    </ClientProvider>
  );
};

export default Page;
