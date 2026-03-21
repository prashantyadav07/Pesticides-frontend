import * as React from 'react';
import { cva } from 'class-variance-authority';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer whitespace-nowrap active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] active:bg-[var(--primary-dark)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] shimmer',
        secondary:
          'bg-[var(--secondary)] text-white hover:bg-[var(--secondary-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
        outline:
          'border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--accent)] hover:border-[var(--primary-light)]',
        ghost:
          'text-[var(--primary)] bg-transparent hover:bg-[var(--accent)]',
        'ghost-neutral':
          'text-[var(--muted-foreground)] bg-transparent hover:bg-[var(--muted)] hover:text-[var(--foreground)]',
        destructive:
          'bg-[var(--destructive)] text-white hover:bg-red-700',
        link:
          'text-[var(--primary)] bg-transparent p-0 h-auto underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-[var(--radius-sm)] [&_svg]:size-3.5',
        md: 'h-10 px-5 text-sm rounded-[var(--radius)] [&_svg]:size-4',
        lg: 'h-12 px-7 text-base rounded-[var(--radius)] [&_svg]:size-5',
        xl: 'h-14 px-9 text-lg rounded-[var(--radius-lg)] [&_svg]:size-5',
        icon: 'h-10 w-10 rounded-[var(--radius)] [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
