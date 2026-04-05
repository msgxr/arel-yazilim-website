import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string | undefined;
  id?: string | undefined;
  'aria-labelledby'?: string | undefined;
  variant?: 'default' | 'alt' | 'dark' | 'brand';
}

const variantClasses = {
  default: 'bg-[var(--bg-premium)]',
  alt: 'bg-slate-100',
  dark: 'bg-brand-dark text-white',
  brand: 'bg-brand-DEFAULT text-white',
};

export default function Section({
  children,
  className,
  id,
  variant = 'default',
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('py-20', variantClasses[variant], className)}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  label?: string | undefined;
  title: ReactNode;
  description?: string | undefined;
  id?: string | undefined;
  center?: boolean | undefined;
  action?: ReactNode | undefined;
  dark?: boolean | undefined;
}

export function SectionHeader({
  label,
  title,
  description,
  id,
  center = false,
  action,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-wrap items-end gap-4',
        center && 'flex-col items-center text-center',
        action && !center && 'justify-between',
      )}
    >
      <div>
        {label && (
          <span className="mb-3 block text-xs font-bold uppercase tracking-[1.5px] text-brand-DEFAULT">
            {label}
          </span>
        )}
        <h2
          id={id}
          className={cn(
            'text-[clamp(28px,4vw,44px)] font-extrabold leading-tight tracking-tight',
            dark ? 'text-white' : 'text-slate-800',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-3 max-w-[560px] text-base leading-7',
              dark ? 'text-white/70' : 'text-slate-500',
              center && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
