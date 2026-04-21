import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900',
  outline: 'border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 bg-transparent',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-[16px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, isLoading, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-xl font-bold transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" className="opacity-25" />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                className="opacity-75"
              />
            </svg>
            Yükleniyor...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';