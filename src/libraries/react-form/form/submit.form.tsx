import { ButtonClass, ButtonProps } from '@/libraries/ui/elements/button';
import { LoadingButton } from '@/libraries/ui/elements/loading-button';

const buttonClass: ButtonClass = { color: 'btn-primary' };

export const Submit = ({ isPending, ...props }: { isPending: boolean } & ButtonProps) => (
  <LoadingButton type='submit' isLoading={isPending} {...{ ...buttonClass, ...props }} />
);
