import { ReactNode } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import { UrlObject } from 'url';

export const Link = ({
  href,
  variant = 'primary',
  className,
  children,
  target,
  icon,
  iconOnly
}: {
  href: UrlObject | string;
  variant?: 'primary' | 'none';
  className?: string;
  children?: ReactNode | string;
  target?: '_blank';
  icon?: ReactNode;
  iconOnly?: boolean;
}) => {
  return (
    <NextLink
      className={cn('hover:text-foreground transition hover:underline', className, {
        'text-primary hover:text-primary-subtle': variant === 'primary'
      })}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      href={href}
      title={iconOnly && typeof children === 'string' ? children : undefined}>
      {icon && <span>{icon}</span>}
      {children && !iconOnly && <span>{children}</span>}
    </NextLink>
  );
};
