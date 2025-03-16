'use client';

import { useForm, useWatch } from 'react-hook-form';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { Loading } from '@/lib/ui/elements/loading';
import { EmailField } from '../../presentation';
import { forgotPasswordMutation } from './forgot-password.mutation';
import { type ForgotPasswordValidation, forgotPasswordValidation } from './forgot-password.validation';

export const ForgotPasswordForm = ({ username }: { username: string }) => {
  const { mutate, isPending } = useMutation({ mutationFn: forgotPasswordMutation });

  const form = useForm<ForgotPasswordValidation>({
    resolver: effectTsResolver(forgotPasswordValidation),
    defaultValues: {
      username
    }
  });

  const usernameValue = useWatch({ name: 'username', control: form.control });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values: ForgotPasswordValidation): void => mutate(values))}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Adresse électronique ou numéro de téléphone portable</FormLabel>
              <EmailField field={{ ...field, disabled: isPending }} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-12 w-full p-6 text-lg' type='submit' disabled={isPending}>
          <Loading isLoading={isPending}>Envoyer un code de réinitialisation</Loading>
        </Button>
      </form>
      <p className='mt-12 text-center'>
        <Link
          href={{
            pathname: '/login',
            query: usernameValue.length > 0 ? { username: usernameValue } : {}
          }}>
          Retour au formulaire de connexion
        </Link>
      </p>
    </Form>
  );
};
