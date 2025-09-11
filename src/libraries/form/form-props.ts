import type { AnyFormApi } from '@tanstack/react-form';
import { handleSubmit } from './handle-submit';

export const formProps =
  <TFormData>(action: (formData: TFormData | FormData) => void | Promise<void>) =>
  (form: AnyFormApi) => ({
    action,
    onSubmit: handleSubmit(form)
  });
