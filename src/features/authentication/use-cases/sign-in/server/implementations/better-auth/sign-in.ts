import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { auth } from '@/libraries/better-auth';
import type { SignIn } from '../contracts';

export const signIn =
  ({ headers }: { headers: ReadonlyHeaders }): SignIn =>
  async (email: string, password: string): Promise<void> => {
    await auth.api.signInEmail({
      body: { email, password },
      headers
    });
  };
