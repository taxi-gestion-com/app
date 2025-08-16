import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';
import type { SignInValidation } from './sign-in.validation';

export const SIGN_IN_KEY = key<(formData: SignInValidation) => Promise<ServerActionResult>>('Authentication.SignIn');
