'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Input } from '@/lib/ui/elements/input';
import { Link } from '@/lib/ui/elements/link';

const loginValidation = z.object({
  username: z.string().min(1, { message: 'Saisissez votre adresse électronique ou numéro de téléphone portable' }),
  password: z.string().min(1, { message: ' Saisissez le mot de passe de votre compte' })
});

export const LoginForm = ({ username }: { username: string }) => {
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      username,
      password: ''
    }
  });

  const usernameWatcher = form.watch('username');

  const onSubmit = (values: z.infer<typeof loginValidation>) => {
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
              <FormControl>
                <Input className='p-6 text-lg' type='text' {...field} />
              </FormControl>
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
              <FormControl>
                <Input className='p-6 text-lg' type='password' {...field} />
              </FormControl>
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
