'use client';

import { RiMailLine } from 'react-icons/ri';
import { applyEffectSchema, formProps, handleAction, useAction, useAppForm } from '@/libraries/react-form';
import { inject } from '@/libraries/piqure';
import { FORGOT_PASSWORD_KEY } from './forgot-password.key';
import { forgotPasswordValidation } from './forgot-password.validation';

export const ForgotPasswordForm = ({ username }: { username: string }) => {
  const [action, isPending] = useAction(inject(FORGOT_PASSWORD_KEY));

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
      <form {...formProps(action)(form)}>
        <form.AppField name='username'>
          {(field) => (
            <field.Item>
              <field.Label>Adresse électronique ou numéro de téléphone portable</field.Label>
              <field.Input isPending={isPending} scale='input-lg' left={<RiMailLine className='opacity-40' />} />
              <field.Info />
            </field.Item>
          )}
        </form.AppField>
        <form.Submit isPending={isPending} scale='btn-lg' modifier='btn-block' className='mt-12'>
          Envoyer un code de réinitialisation
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
