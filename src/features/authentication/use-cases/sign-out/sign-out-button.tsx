'use client';

import { inject } from '@/libraries/piqure';
import { type ServerActionResult, useServerAction } from '@/libraries/server-action';
import type { ButtonProps } from '@/libraries/ui/primitives/button';
import { LoadingButton } from '@/libraries/ui/primitives/loading-button';
import { SIGN_OUT_KEY } from './sign-out.key';

export const SignOutButton = (props: ButtonProps) => {
  const [action, isPending] = useServerAction<void, FormData, (_: FormData) => Promise<ServerActionResult>>(
    inject(SIGN_OUT_KEY)
  );

  return (
    <form action={action}>
      <LoadingButton isLoading={isPending} {...props} type='submit' />
    </form>
  );
};
