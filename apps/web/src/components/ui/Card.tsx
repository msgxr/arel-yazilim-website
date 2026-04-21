import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-slate-200',
  elevated: 'bg-white shadow-lg shadow-black/5',
  outlined: 'bg-transparent border-2 border-slate-200',
  glass: 'bg-white/80 backdrop-blur-md border border-white/20',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all',
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn('text-lg font-bold text-slate-900', className)}>{children}</h3>;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cn('text-sm text-slate-500 mt-1', className)}>{children}</p>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('', className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-slate-100 flex items-center gap-4', className)}>
      {children}
    </div>
  );
}