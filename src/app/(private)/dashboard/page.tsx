import type { Metadata } from 'next';
import { DashboardPage } from '@/features/overview';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Tableau de bord')
};

export default DashboardPage;
