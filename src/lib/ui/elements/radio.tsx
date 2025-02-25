import { ReactNode } from 'react';

export const RadioGroup = ({ children }: { children: ReactNode }) => (
  <div className='bg-body-tertiary inline-grid grid-cols-3 gap-0.5 rounded-full p-0.75' role='radiogroup'>
    {children}
  </div>
);

export const RadioItem = ({
  label,
  value,
  selected,
  icon,
  onClick
}: {
  label: string;
  value: string;
  selected: string | undefined;
  icon: ReactNode;
  onClick: () => void;
}) => (
  <span
    suppressHydrationWarning
    className='dark:data-checked:text-foreground data-checked:bg-body data-checked:ring-muted-foreground rounded-full p-1.5 data-checked:ring sm:p-1'
    aria-label={label}
    role='radio'
    aria-checked={selected === value}
    data-checked={selected === value ? true : null}
    onClick={onClick}>
    {icon}
  </span>
);
