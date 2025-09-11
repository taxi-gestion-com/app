import type { Session, User } from 'better-auth';
import { headers } from 'next/headers';
import { auth } from './auth';

export const getSession = async (): Promise<{ session: Session; user: User } | null> =>
  auth.api.getSession({ headers: await headers() });
