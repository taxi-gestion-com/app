import { Metadata } from 'next';
import { appPageTitle } from '@/features/web';
import { ForgotPasswordPage } from '@/features/authentication/presentation';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: appPageTitle('Mot de passe oublié')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;
  return <ForgotPasswordPage username={username ?? ''} />;
};

export default Page;
