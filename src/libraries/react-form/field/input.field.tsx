import { cn } from '@/libraries/utils';
import { Input as InputBase, type InputProps as InputBaseProps } from '@/libraries/ui/elements/input';
import { useFieldContext } from '../form-context';

type InputProps = Omit<InputBaseProps, 'name'> & {
  isPending: boolean;
};

export const Input = ({ className, type = 'text', isPending, ...props }: InputProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();

  return (
    <InputBase
      id={name}
      name={name}
      type={type}
      value={state.value}
      disabled={isPending ?? props.disabled}
      onBlur={handleBlur}
      onChange={(e) => handleChange(e.target.value)}
      className={cn(
        'w-full',
        (state.meta.isBlurred || state.meta.isTouched) && state.meta.errors.length > 0 && 'input-error',
        className
      )}
      {...props}
    />
  );
};
