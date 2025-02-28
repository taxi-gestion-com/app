import { Metadata } from 'next';
import { appPageTitle } from '@/features/web';
import { ActivatePage } from '@/features/authentication';

export const metadata: Metadata = {
  title: appPageTitle('Activez votre compte')
};

export default ActivatePage;
