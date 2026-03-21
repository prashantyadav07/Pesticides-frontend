import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  ({ className, label, id, error, prefix: PrefixIcon, suffix: SuffixIcon, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="relative group w-full">
        {PrefixIcon && (
          <PrefixIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[var(--muted-foreground)] pointer-events-none z-10" />
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full h-14 px-4 pt-5 pb-2 bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-[var(--radius)] text-sm font-medium font-sans outline-none ring-0 transition-all duration-200 ease-out focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed peer',
            PrefixIcon && 'pl-10',
            SuffixIcon && 'pr-10',
            error && 'border-[var(--destructive)] focus:ring-[var(--destructive)]/20',
            className
          )}
          placeholder=" "
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className="floating-label"
          >
            {label}
          </label>
        )}
        {SuffixIcon && (
          <SuffixIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-[var(--muted-foreground)] pointer-events-none" />
        )}
        {error && (
          <p className="text-xs text-[var(--destructive)] mt-1 font-sans">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export default Input;
