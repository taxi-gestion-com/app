'use client';

import { useMutation } from '@tanstack/react-query';
import { applyEffectSchema, handleSubmit, useAppForm } from '@/lib/react-form';
import { loginMutation } from './login.mutation';
import { loginValidation } from './login.validation';

export const LoginForm = ({ username }: { username: string }) => {
  const { isPending, mutate } = useMutation({ mutationFn: loginMutation });

  const form = useAppForm({
    defaultValues: {
      username,
      password: ''
    },
    validators: {
      onChange: applyEffectSchema(loginValidation)
    },
    onSubmit: async ({ value }) => mutate(value)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='username'>
          {(field) => (
            <field.Item>
              <field.Label>Adresse électronique ou numéro de téléphone portable</field.Label>
              <field.Text isPending={isPending} />
              <field.Info />
            </field.Item>
          )}
        </form.AppField>
        <form.AppField name='password'>
          {(field) => (
            <field.Item>
              <field.Label>Mot de passe</field.Label>
              <field.Text type='password' isPending={isPending} />
              <field.Info />
            </field.Item>
          )}
        </form.AppField>
        <div className='text-end'>
          <form.QueryLink pathname='/forgot-password' queryParam='username'>
            Mot de passe oublié&nbsp;?
          </form.QueryLink>
        </div>
        <form.Submit isPending={isPending} size='btn-lg' modifier='btn-block' className='mt-12'>
          Se connecter
        </form.Submit>
      </form>
      <p className='mt-12 text-center'>
        Pas encore de compte ?&ensp;
        <form.QueryLink pathname='/register' queryParam='username'>
          Créez le dès à présent&nbsp;!
        </form.QueryLink>
      </p>
    </form.AppForm>
  );
};
