import type { ReactNode } from 'react';
import type { LoosePartial } from '@/libraries/utils';
import { ForgotPasswordForm } from './forgot-password.form';
import type { ForgotPasswordValidation } from './forgot-password.validation';

type ForgotPasswordPageProps = LoosePartial<ForgotPasswordValidation>;

export const ForgotPasswordPage = async ({ username }: ForgotPasswordPageProps): Promise<ReactNode> => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Mot de passe oublié</h1>
    <p className='text-muted mb-12'>
      Entrez l’adresse électronique associée à votre compte et nous vous enverrons un code de réinitialisation de mot de passe.
    </p>
    <ForgotPasswordForm username={username} />
  </>
);
