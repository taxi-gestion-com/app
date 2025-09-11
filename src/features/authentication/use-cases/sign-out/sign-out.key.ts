import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';

export const SIGN_OUT_KEY = key<() => Promise<ServerActionResult>>('Authentication.SignOut');
