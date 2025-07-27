import { ReactNode } from 'react';
import { Metadata } from 'next';
import {
  FORGOT_PASSWORD_KEY,
  forgotPasswordMutation,
  ForgotPasswordPage
} from '@/features/authentication/use-cases/forgot-password';
import { appPageTitle } from '@/features/web';
import { ClientProvider } from '@/libraries/piqure';
import { guestOrRedirect } from '@/libraries/better-auth';

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
