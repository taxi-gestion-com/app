import { cn } from '@/libraries/utils';
import { Input as InputBase, type InputProps as InputBaseProps } from '@/libraries/ui/primitives/input';
import { useFieldContext } from '../form-context';
import { hasError } from './has-error';

type InputProps = Omit<InputBaseProps, 'name'> & {
  isPending: boolean;
  isConnected?: boolean;
};

export const Input = ({ className = 'w-full', type = 'text', isPending, isConnected = true, ...props }: InputProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();

  return isConnected ? (
    <InputBase
      id={name}
      name={name}
      type={type}
      value={state.value}
      disabled={isPending ?? props.disabled}
      onBlur={handleBlur}
      onChange={(e) => handleChange(e.target.value)}
      className={cn(hasError(state) && 'input-error', className)}
      {...props}
    />
  ) : (
    <InputBase
      type={type}
      disabled={isPending ?? props.disabled}
      className={cn('w-full', hasError(state) && 'input-error', className)}
      {...props}
    />
  );
};
