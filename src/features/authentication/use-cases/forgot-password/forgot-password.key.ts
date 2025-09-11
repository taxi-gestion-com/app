import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';
import type { ForgotPasswordValidation } from './forgot-password.validation';

export const FORGOT_PASSWORD_KEY =
  key<(formData: ForgotPasswordValidation) => Promise<ServerActionResult>>('Authentication.ForgotPassword');
