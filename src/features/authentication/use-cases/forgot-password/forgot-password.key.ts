import { key } from '@/libraries/piqure';
import { ForgotPasswordValidation } from './forgot-password.validation';

export const FORGOT_PASSWORD_KEY = key<(formData: ForgotPasswordValidation) => Promise<void>>('Authentication.ForgotPassword');
