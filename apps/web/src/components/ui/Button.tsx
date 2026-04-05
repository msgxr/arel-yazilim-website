import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-DEFAULT text-white border-brand-DEFAULT hover:bg-brand-vibrant hover:border-brand-vibrant hover:-translate-y-0.5 hover:shadow-brand-lg',
  secondary:
    'bg-brand-soft text-brand-DEFAULT border border-brand-DEFAULT hover:bg-brand-DEFAULT hover:text-white',
  ghost:
    'bg-transparent text-slate-800 border border-slate-200 hover:bg-white hover:border-slate-300',
  white:
    'bg-white text-brand-DEFAULT border-white hover:-translate-y-0.5 hover:shadow-lg',
  dark: 'bg-brand-dark text-white border-brand-dark hover:bg-[#1A1D24] hover:-translate-y-0.5 hover:shadow-lg',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[13px]',
  md: 'px-7 py-3.5 text-[14px]',
  lg: 'px-9 py-[18px] text-[16px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md border font-bold tracking-wide shadow-sm transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Link variant — renders as <a> but styled as button
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  children: React.ReactNode;
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md border font-bold tracking-wide shadow-sm transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
