import { Metadata } from 'next';
import { DashboardPage } from '@/features/overview';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Tableau de bord')
};

const Page = async () => <DashboardPage />;

export default Page;
