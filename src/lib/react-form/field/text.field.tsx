import { useFieldContext } from '../form-context';

export const Text = ({
  type = 'text',
  placeholder,
  isPending
}: {
  type?: string;
  placeholder?: string;
  isPending: boolean;
}) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();
  return (
    <input
      className='input w-full'
      id={name}
      name={name}
      type={type}
      value={state.value}
      disabled={isPending}
      placeholder={placeholder}
      onBlur={handleBlur}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
