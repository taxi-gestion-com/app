import toast from 'react-hot-toast';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import type { ServerActionSuccess } from '../server-action-result';

export const toastSuccess =
  <T,>(message: (data?: T) => string) =>
  ({ data }: ServerActionSuccess<T>) => {
    toast.success(message(data), {
      icon: <RiCheckboxCircleLine size='1.25rem' />
    });
  };
