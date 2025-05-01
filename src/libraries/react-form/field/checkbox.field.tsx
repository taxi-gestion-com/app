import { Checkbox as CheckboxBase, type CheckboxProps as CheckboxBaseProps } from '@/libraries/ui/elements/checkbox';
import { useFieldContext } from '../form-context';
import { Label } from './label.field';

type CheckboxProps = Omit<CheckboxBaseProps, 'name' | 'type'> & {
  isPending: boolean;
};

export const Checkbox = ({ isPending, children, ...props }: CheckboxProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<boolean>();

  return (
    <Label className='flex items-center gap-x-1.5'>
      <CheckboxBase
        id={name}
        name={name}
        value={state.value ? 'true' : 'false'}
        disabled={isPending ?? props.disabled}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value === 'false')}
        color={
          (state.meta.isBlurred || state.meta.isTouched) && state.meta.errors.length > 0 ? 'checkbox-error' : 'checkbox-primary'
        }
        className={state.meta.errors.length === 0 ? 'not-checked:border-base-500' : undefined}
        {...props}
      />
      {children}
    </Label>
  );
};
