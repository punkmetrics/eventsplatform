import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <div className="relative flex items-center w-full">
    {icon && (
      <div className="absolute left-4 text-muted-foreground">{icon}</div>
    )}
    <Input
      ref={ref}
      className={cn(
        'w-full bg-muted text-foreground rounded-full py-6 text-base border-none focus-visible:ring-2 focus-visible:ring-ring',
        icon ? 'pl-12' : 'pl-6',
        className
      )}
      {...props}
    />
  </div>
));
SearchInput.displayName = 'SearchInput';

export { SearchInput };
