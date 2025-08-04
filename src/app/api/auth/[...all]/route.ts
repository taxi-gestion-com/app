import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/libraries/better-auth';

export const { POST, GET } = toNextJsHandler(auth);
