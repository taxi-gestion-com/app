'use client';

import type { ReactNode } from 'react';
import { RiMailLine } from 'react-icons/ri';
import { applyEffectSchema, handleAction, handleSubmit, useAppForm } from '@/libraries/form';
import { inject } from '@/libraries/piqure';
import { useServerAction } from '@/libraries/server-action';
import { FORGOT_PASSWORD_KEY } from './forgot-password.key';
import { forgotPasswordValidation } from './forgot-password.validation';

export const ForgotPasswordForm = ({ username }: { username: string }): ReactNode => {
  const [action, isPending] = useServerAction(inject(FORGOT_PASSWORD_KEY));

  const form = useAppForm({
    defaultValues: {
      username
    },
    validators: {
      onChange: applyEffectSchema(forgotPasswordValidation)
    },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='username'>
          {(field) => (
            <field.Group>
              <field.Label>Adresse électronique</field.Label>
              <field.Input isPending={isPending} scale='input-lg' left={<RiMailLine className='opacity-40' />} />
              <field.Info />
            </field.Group>
          )}
        </form.AppField>
        <form.Submit isPending={isPending} scale='btn-lg' modifier='btn-block' className='mt-12'>
          Réinitialiser mon mot de passe
        </form.Submit>
      </form>
      <p className='mt-12 text-center'>
        <form.QueryLink pathname='/login' queryParam='username'>
          Retour au formulaire de connexion
        </form.QueryLink>
      </p>
    </form.AppForm>
  );
};
