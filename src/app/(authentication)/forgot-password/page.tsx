import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ForgotPasswordPage } from '@/features/authentication';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Mot de passe oublié')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;
  return <ForgotPasswordPage username={username ?? ''} />;
};

export default Page;
