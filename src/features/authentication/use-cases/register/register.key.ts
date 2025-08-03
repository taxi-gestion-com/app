import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';
import type { RegisterValidation } from './register.validation';

export const REGISTER_KEY = key<(formData: RegisterValidation) => Promise<ServerActionResult>>('Authentication.Register');
