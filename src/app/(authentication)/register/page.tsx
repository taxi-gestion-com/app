import { ReactNode } from 'react';
import { Metadata } from 'next';
import { RegisterPage } from '@/features/authentication';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Créez votre compte')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;
  return <RegisterPage username={username ?? ''} />;
};

export default Page;
