import { DashboardPage } from '@/features/overview';
import { Metadata } from 'next';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Tableau de bord')
};

export default DashboardPage;
