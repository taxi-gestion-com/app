import type { ReactNode } from 'react';
import type { LoosePartial } from '@/libraries/utils';
import { ActivateForm } from './activate.form';
import type { ActivateValidation } from './activate.validation';

type ActivatePageProps = LoosePartial<ActivateValidation> & { email: string | undefined };

export const ActivatePage = async ({ email, token }: ActivatePageProps): Promise<ReactNode> => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Activez votre compte</h1>
    {token ? (
      <>
        <p className='mb-6'>Il ne vous reste plus qu’à valider votre compte et vous serez directement connecté.</p>
        <ActivateForm token={token} />
      </>
    ) : (
      <>
        <p className='mb-4'>
          {email ? (
            <>
              Un email vient d’être envoyé à <b>{email}</b>
            </>
          ) : (
            'Vous avez reçu un mail d’activation de votre compte'
          )}
        </p>
        <p className='text-muted mb-12'>
          👉 Ouvrez votre boîte mail et cliquez sur le lien pour vérifier votre adresse email et activer votre compte.
        </p>
      </>
    )}
  </>
);
