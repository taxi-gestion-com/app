'use client';

import type { ReactNode } from 'react';
import { applyEffectSchema, handleAction, handleSubmit, useAppForm } from '@/libraries/form';
import { inject } from '@/libraries/piqure';
import { useServerAction } from '@/libraries/server-action';
import { toastError, toastSuccess } from '@/libraries/server-action/components';
import { Link } from '@/libraries/ui/primitives/link';
import { ACTIVATE_KEY } from './activate.key';
import { activateValidation } from './activate.validation';

export const ActivateForm = ({ token }: { token: string }): ReactNode => {
  const [action, isPending, state] = useServerAction(inject(ACTIVATE_KEY), {
    onSuccess: toastSuccess(() => 'Votre compte a été activé avec succès.'),
    onError: toastError
  });

  const form = useAppForm({
    defaultValues: {
      token
    },
    validators: {
      onChange: applyEffectSchema(activateValidation)
    },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='token'>{(field) => <field.Input isPending={isPending} hidden />}</form.AppField>
        <form.Submit isPending={isPending} scale='btn-lg' modifier='btn-block'>
          Activer mon compte
        </form.Submit>
      </form>
      {state?.success === false && (
        <>
          <p className='mt-12 mb-4 text-center'>
            Un problème avec le lien d’activation&nbsp;?
            <br />
          </p>
          <p className='text-center'>
            Recommencez la <Link href='/register'>création de votre compte</Link> pour en générer un nouveau&nbsp;!
          </p>
        </>
      )}
    </form.AppForm>
  );
};
