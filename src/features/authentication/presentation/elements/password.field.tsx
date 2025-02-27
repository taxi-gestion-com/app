import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { RiEyeLine, RiEyeOffLine, RiLockLine } from 'react-icons/ri';
import { FormControl } from '@/lib/ui/elements/form';
import { Input } from '@/lib/ui/elements/input';

export const PasswordField = <T,>({ field }: { field: ControllerRenderProps<T> }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <FormControl>
        <Input className='p-6 px-11 text-lg' type={showPassword ? 'text' : 'password'} {...field} />
      </FormControl>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 opacity-40'>
        <RiLockLine />
      </div>
      <button
        className='absolute inset-y-0 right-0 pr-4'
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        aria-pressed={showPassword}>
        {showPassword ? <RiEyeOffLine size='20' /> : <RiEyeLine size='20' />}
      </button>
    </div>
  );
};
