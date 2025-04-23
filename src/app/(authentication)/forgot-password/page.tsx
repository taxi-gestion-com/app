import { ReactNode } from 'react';
import { Metadata } from 'next';
import {
  FORGOT_PASSWORD_KEY,
  forgotPasswordMutation,
  ForgotPasswordPage
} from '@/features/authentication/use-cases/forgot-password';
import { appPageTitle } from '@/features/web';
import { ClientProvider } from '@/lib/piqure';

export const metadata: Metadata = {
  title: appPageTitle('Mot de passe oublié')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;
  return (
    <ClientProvider bind={FORGOT_PASSWORD_KEY} to={forgotPasswordMutation}>
      <ForgotPasswordPage username={username ?? ''} />
    </ClientProvider>
  );
};

export default Page;
