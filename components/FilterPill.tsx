import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const FilterPill = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
>(({ className, active, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant={active ? 'default' : 'secondary'}
    className={cn(
      'rounded-full px-5 py-5 text-xs font-bold tracking-wider uppercase',
      className
    )}
    {...props}
  >
    {children}
  </Button>
));
FilterPill.displayName = 'FilterPill';
