'use client';

import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { forgotPasswordSchema, ForgotPasswordSchema } from '../../domain';
import { EmailField } from '../elements';

export const ForgotPasswordForm = ({ username }: { username: string }) => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: effectTsResolver(forgotPasswordSchema),
    defaultValues: {
      username
    }
  });

  const usernameWatcher = form.watch('username');

  const onSubmit = (values: ForgotPasswordSchema) => {
    console.log(values);
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
              <EmailField field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-12 w-full p-6 text-lg' type='submit'>
          Envoyer un code de réinitialisation
        </Button>
      </form>
      <p className='mt-12 text-center'>
        <Link href={{ pathname: '/login', query: usernameWatcher.length > 0 ? { username: usernameWatcher } : {} }}>
          Retour au formulaire de connexion
        </Link>
      </p>
    </Form>
  );
};
