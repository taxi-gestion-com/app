'use client';

import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { LoginSchema, loginSchema } from '../../domain';
import { EmailField, PasswordField } from '../elements';

export const LoginForm = ({ username }: { username: string }) => {
  const form = useForm<LoginSchema>({
    resolver: effectTsResolver(loginSchema),
    defaultValues: {
      username,
      password: ''
    }
  });

  const usernameWatcher = form.watch('username');

  const onSubmit = (values: LoginSchema) => {
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Mot de passe</FormLabel>
              <PasswordField field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-end'>
          <Link href={{ pathname: '/forgot-password', query: usernameWatcher.length > 0 ? { username: usernameWatcher } : {} }}>
            Mot de passe oublié ?
          </Link>
        </div>
        <Button className='mt-12 w-full p-6 text-lg' type='submit'>
          Se connecter
        </Button>
      </form>
      <p className='mt-12 text-center'>
        <Link href={{ pathname: '/register', query: usernameWatcher.length > 0 ? { username: usernameWatcher } : {} }}>
          Créez le dès à présent&nbsp;!
        </Link>
      </p>
    </Form>
  );
};
