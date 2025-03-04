'use client';

import { useMutation } from '@tanstack/react-query';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { Loading } from '@/lib/ui/elements/loading';
import { useTRPC } from '@/trpc/client';
import { EmailField } from '../_presentation';
import { forgotPasswordValidation, ForgotPasswordValidation } from './forgot-password.validation';

export const ForgotPasswordForm = ({ username }: { username: string }) => {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(trpc.authentication.forgotPassword.mutationOptions());

  const form = useForm<ForgotPasswordValidation>({
    resolver: effectTsResolver(forgotPasswordValidation),
    defaultValues: {
      username
    }
  });

  const usernameValue = form.watch('username');

  const onSubmit = (values: ForgotPasswordValidation): void => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
