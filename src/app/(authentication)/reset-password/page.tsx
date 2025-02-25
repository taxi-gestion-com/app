import { Metadata } from 'next';
import { appPageTitle } from '@/features/web';
import { ResetPasswordPage } from '@/features/authentication/presentation';

export const metadata: Metadata = {
  title: appPageTitle('Réinitialiser le mot de passe')
};

export default ResetPasswordPage;
