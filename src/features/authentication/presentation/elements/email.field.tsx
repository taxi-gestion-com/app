import { ControllerRenderProps } from 'react-hook-form';
import { RiMailLine } from 'react-icons/ri';
import { FormControl } from '@/lib/ui/elements/form';
import { Input } from '@/lib/ui/elements/input';

export const EmailField = <T,>({ field }: { field: ControllerRenderProps<T> }) => (
  <div className='relative'>
    <FormControl>
      <Input className='p-6 pl-11 text-lg' type='text' {...field} />
    </FormControl>
    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 opacity-40'>
      <RiMailLine />
    </div>
  </div>
);
