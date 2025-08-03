import toast from 'react-hot-toast';
import { RiCloseCircleLine } from 'react-icons/ri';
import type { ServerActionError } from '../server-action-result';

export const toastError = ({ error }: ServerActionError) => {
  toast.error(error, {
    icon: <RiCloseCircleLine size='1.25rem' />
  });
};
