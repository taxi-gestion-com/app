'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Input } from '@/lib/ui/elements/input';
import { Link } from '@/lib/ui/elements/link';

const forgotPasswordValidation = z.object({
  username: z.string().min(1, { message: 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
});

export const ForgotPasswordForm = ({ username }: { username: string }) => {
  const form = useForm<z.infer<typeof forgotPasswordValidation>>({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: {
      username
    }
  });

  const usernameWatcher = form.watch('username');

  const onSubmit = (values: z.infer<typeof forgotPasswordValidation>) => {
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
