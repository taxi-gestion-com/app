import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';

export const LOGOUT_KEY = key<() => Promise<ServerActionResult>>('Authentication.Logout');
