import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef(({ className, hover = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] transition-all duration-350 ease-out overflow-hidden',
      hover && 'hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 card-hover',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pt-6 pb-0 flex flex-col gap-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-serif font-semibold text-xl leading-tight text-[var(--foreground)]',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[var(--muted-foreground)] leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pt-0 pb-6 flex items-center gap-3', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

const CardMedia = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative overflow-hidden aspect-[4/3] bg-[var(--muted)] [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-110',
      className
    )}
    {...props}
  />
));
CardMedia.displayName = 'CardMedia';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardMedia };
export default Card;
