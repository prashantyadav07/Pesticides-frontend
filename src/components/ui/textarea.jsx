import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.memo(React.forwardRef(
  ({ className, label, id, error, ...props }, ref) => {
    const textareaId = id || React.useId();

    return (
      <div className="relative group w-full">
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full min-h-[130px] resize-none pt-6 pb-3 px-4 bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-[var(--radius)] text-sm font-medium font-sans outline-none ring-0 transition-[border-color,box-shadow,background-color] duration-200 ease-out focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed peer',
            error && 'border-[var(--destructive)] focus:ring-[var(--destructive)]/20',
            className
          )}
          placeholder=" "
          {...props}
        />
        {label && (
          <label
            htmlFor={textareaId}
            className="floating-label"
          >
            {label}
          </label>
        )}
        {error && (
          <p className="text-xs text-[var(--destructive)] mt-1 font-sans">{error}</p>
        )}
      </div>
    );
  }
));

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
