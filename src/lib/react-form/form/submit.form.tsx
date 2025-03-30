import { ButtonClass, ButtonProps } from '@/lib/ui/elements/button';
import { LoadingButton } from '@/lib/ui/elements/loading-button';

const buttonClass: ButtonClass = { color: 'btn-primary' };

export const Submit = ({ isPending, ...props }: { isPending: boolean } & ButtonProps) => (
  <LoadingButton type='submit' isLoading={isPending} {...{ ...buttonClass, ...props }} />
);
