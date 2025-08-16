import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';
import type { ResetPasswordValidation } from './reset-password.validation';

export const RESET_PASSWORD_KEY =
  key<(formData: ResetPasswordValidation) => Promise<ServerActionResult>>('Authentication.ResetPassword');
