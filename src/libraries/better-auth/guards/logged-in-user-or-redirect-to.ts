import type { User } from 'better-auth';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from '@/env';
import { getSession } from '../get-session';

const redirectWithRequestedPath = async (redirectPath: string) =>
  redirect(`${redirectPath}?redirect=${(await headers()).get('x-requested-path')}`);

export const loggedInUserOrRedirectTo = (redirectPath: string) => async (): Promise<User> => {
  const betterAuthSessionToken = (await cookies()).get(env.AUTH_SESSION_TOKEN);
  if (betterAuthSessionToken == null) {
    return await redirectWithRequestedPath(redirectPath);
  }

  const session = await getSession();
  if (session == null) {
    return await redirectWithRequestedPath(redirectPath);
  }

  return session.user;
};
