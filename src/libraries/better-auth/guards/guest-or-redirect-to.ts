import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSession } from '../get-session';

export const guestOrRedirectTo = (redirectPath: string) => async (): Promise<void> => {
  const betterAuthSessionToken = (await cookies()).get('better-auth.session_token');
  if (betterAuthSessionToken != null) return redirect(redirectPath);

  const session = await getSession();
  if (session != null) return redirect(redirectPath);
};
