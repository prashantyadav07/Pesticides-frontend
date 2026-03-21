import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-sans font-semibold text-xs tracking-wide transition-colors duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--accent)] text-[var(--primary)] border border-[var(--primary)]/20',
        secondary:
          'bg-[var(--secondary)]/10 text-[var(--secondary)] border border-[var(--secondary)]/20',
        success:
          'bg-green-50 text-green-700 border border-green-200',
        warning:
          'bg-amber-50 text-amber-700 border border-amber-200',
        danger:
          'bg-red-50 text-red-700 border border-red-200',
        outline:
          'border border-[var(--border)] text-[var(--muted-foreground)] bg-transparent',
        solid:
          'bg-[var(--primary)] text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const Badge = React.memo(function Badge({ className, variant, size, icon: Icon, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {Icon && <Icon className="size-3" />}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export default Badge;
