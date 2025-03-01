import { Metadata } from 'next';
import { ResetPasswordPage } from '@/features/authentication';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Réinitialiser le mot de passe')
};

export default ResetPasswordPage;
