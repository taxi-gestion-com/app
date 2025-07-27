import { key } from '@/libraries/piqure';

export const LOGOUT_KEY = key<() => Promise<void>>('Authentication.Logout');
