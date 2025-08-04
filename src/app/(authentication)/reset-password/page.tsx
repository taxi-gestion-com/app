import type { Metadata } from 'next';
import { ResetPasswordPage } from '@/features/authentication/use-cases/reset-password';
import { appPageTitle } from '@/features/web';

export const metadata: Metadata = {
  title: appPageTitle('Réinitialiser mon mot de passe')
};

export default ResetPasswordPage;
