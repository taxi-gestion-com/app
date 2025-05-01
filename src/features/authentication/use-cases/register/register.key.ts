import { key } from '@/libraries/piqure';
import { RegisterValidation } from './register.validation';

export const REGISTER_KEY = key<(formData: RegisterValidation) => Promise<void>>('Authentication.Register');
