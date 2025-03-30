import { ReactNode } from 'react';
import { ForgotPasswordForm } from './forgot-password.form';

export const ForgotPasswordPage = async ({ username }: { username: string }): Promise<ReactNode> => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Mot de passe oublié</h1>
    <p className='text-base-content/60 mb-12'>
      Entrez l’adresse e-mail ou le numéro de téléphone portable de votre compte et nous vous enverrons un code de
      réinitialisation de mot de passe.
    </p>
    <ForgotPasswordForm username={username} />
  </>
);
