import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export type ButtonClass<Prefix extends `${string}btn` = 'btn'> = {
  color?: `${Prefix}-${'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'}`;
  style?: `${Prefix}-${'outline' | 'dash' | 'soft' | 'ghost' | 'link'}`;
  behavior?: `${Prefix}-${'active' | 'disabled'}`;
  size?: `${Prefix}-${'xs' | 'sm' | 'md' | 'lg' | 'xl'}`;
  modifier?: `${Prefix}-${'wide' | 'block' | 'square' | 'circle'}`;
};

export type ButtonProps = ComponentProps<'button'> & ButtonClass;

export const Button = ({ className, color, style, behavior, size, modifier, ...props }: ButtonProps) => (
  <button className={cn('btn', color, style, behavior, size, modifier, className)} {...props} />
);
