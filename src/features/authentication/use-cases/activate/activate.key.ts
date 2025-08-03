import { key } from '@/libraries/piqure';
import type { ServerActionResult } from '@/libraries/server-action';
import type { ActivateValidation } from './activate.validation';

export const ACTIVATE_KEY = key<(formData: ActivateValidation) => Promise<ServerActionResult>>('Authentication.Activate');
