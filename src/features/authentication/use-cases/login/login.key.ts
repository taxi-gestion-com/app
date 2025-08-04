import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';
import type { LoginValidation } from './login.validation';

export const LOGIN_KEY = key<(formData: LoginValidation) => Promise<ServerActionResult>>('Authentication.Login');
