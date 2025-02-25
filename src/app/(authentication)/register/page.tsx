import { ReactNode } from 'react';
import { Metadata } from 'next';
import { appPageTitle } from '@/features/web';
import { RegisterPage } from '@/features/authentication/presentation';

export const metadata: Metadata = {
  title: appPageTitle('Créez votre compte')
};

const Page = async ({ searchParams }: { searchParams: Promise<{ username?: string }> }): Promise<ReactNode> => {
  const { username } = await searchParams;
  return <RegisterPage username={username ?? ''} />;
};

export default Page;
