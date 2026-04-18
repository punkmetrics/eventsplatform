import React from 'react';
import { cn } from '@/lib/utils';

export const CategoryCard = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    icon?: React.ReactNode;
  }
>(({ className, title, icon, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'relative flex flex-col justify-end text-left w-[104px] h-[104px] p-3.5 rounded-2xl bg-muted text-foreground hover:bg-muted/80 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      className
    )}
    {...props}
  >
    {icon && (
      <div className="absolute top-3.5 left-3.5 text-muted-foreground">
        {icon}
      </div>
    )}
    <span className="text-[15px] font-medium leading-tight">{title}</span>
  </button>
));
CategoryCard.displayName = 'CategoryCard';
