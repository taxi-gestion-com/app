import type { ReactNode } from 'react';
import type { ResetPasswordValidation } from '@/features/authentication/use-cases';
import type { LoosePartial } from '@/libraries/utils';
import { ResetPasswordForm } from './reset-password.form';

type ResetPasswordPageProps = LoosePartial<Pick<ResetPasswordValidation, 'email' | 'token'>>;

export const ResetPasswordPage = async ({ email, token }: ResetPasswordPageProps): Promise<ReactNode> => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Réinitialiser votre mot de passe</h1>
    {token ? (
      <>
        <p className='mb-6'>Il ne vous reste plus qu’à choisir votre nouveau mot de passe.</p>
        <ResetPasswordForm token={token} email={email} />
      </>
    ) : (
      <>
        <p className='mb-4'>
          {email ? (
            <>
              Un email vient d’être envoyé à <b>{email}</b>
            </>
          ) : (
            'Vous avez reçu un mail de réinitialisation de votre mot de passe'
          )}
        </p>
        <p className='text-muted mb-12'>
          👉 Ouvrez votre boîte mail et cliquez sur le lien pour choisir un nouveau mot de passe.
        </p>
      </>
    )}
  </>
);
