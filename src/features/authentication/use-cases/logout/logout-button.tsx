'use client';

import { ButtonProps } from '@/libraries/ui/primitives/button';
import { useAction } from '@/libraries/form';
import { LoadingButton } from '@/libraries/ui/primitives/loading-button';
import { inject } from '@/libraries/piqure';
import { LOGOUT_KEY } from './logout.key';

export const LogoutButton = (props: ButtonProps) => {
  const [action, isPending] = useAction(inject(LOGOUT_KEY));

  return (
    <form action={action}>
      <LoadingButton isLoading={isPending} {...props} type='submit' />
    </form>
  );
};
