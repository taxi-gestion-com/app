import { key } from '@/libraries/piqure';
import { LoginValidation } from './login.validation';

export const LOGIN_KEY = key<(formData: LoginValidation) => Promise<void>>('Authentication.Login');
