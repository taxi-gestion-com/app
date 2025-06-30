import { key } from '@/libraries/piqure';
import { UserInformationsValidation } from './user-informations.validation';

export const USER_INFORMATIONS_KEY = key<(formData: UserInformationsValidation) => Promise<void>>('Overview.UserInformations');
