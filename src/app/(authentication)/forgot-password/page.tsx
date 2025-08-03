import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  FORGOT_PASSWORD_KEY,
  ForgotPasswordPage,
  forgotPasswordMutation
} from '@/features/authentication/use-cases/forgot-password';
import { appPageTitle } from '@/features/web';
import { guestOrRedirect } from '@/libraries/better-auth';
import { ClientProvider } from '@/libraries/piqure';

export const metadata: Metadata = {
  title: appPageTitle('Mot de passe oublié')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  await guestOrRedirect();

  const { username } = await searchParams;

  return (
    <ClientProvider bind={FORGOT_PASSWORD_KEY} to={forgotPasswordMutation}>
      <ForgotPasswordPage username={username ?? ''} />
    </ClientProvider>
  );
};

export default Page;
