import { Checkbox as CheckboxBase, type CheckboxProps as CheckboxBaseProps } from '@/libraries/ui/primitives/checkbox';
import { useFieldContext } from '../form-context';
import { Label } from './label.field';
import { hasError } from './has-error';

type CheckboxProps = Omit<CheckboxBaseProps, 'name' | 'type'> & {
  isPending: boolean;
};

export const Checkbox = ({ isPending, children, className = 'flex items-center gap-x-1.5', ...props }: CheckboxProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<boolean>();

  return (
    <Label className={className}>
      <CheckboxBase
        id={name}
        name={name}
        value={state.value ? 'true' : 'false'}
        disabled={isPending ?? props.disabled}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value === 'false')}
        color={hasError(state) ? 'checkbox-error' : 'checkbox-primary'}
        className={state.meta.errors.length === 0 ? 'not-checked:border-base-500' : undefined}
        {...props}
      />
      {children}
    </Label>
  );
};
