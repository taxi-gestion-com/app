import { ButtonClass, ButtonProps } from '@/libraries/ui/primitives/button';
import { LoadingButton } from '@/libraries/ui/primitives/loading-button';

const buttonClass: ButtonClass = { color: 'btn-primary' };

export const Submit = ({ isPending, ...props }: { isPending: boolean } & ButtonProps) => (
  <LoadingButton type='submit' isLoading={isPending} {...{ ...buttonClass, ...props }} />
);
