'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FieldProps {
  label: string;
  error?: string | undefined;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, required, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-1">
        {label}
        {required && <span className="text-brand-DEFAULT" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[12px] font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase = "w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
const inputVariants = {
  default: "border-slate-200 focus:border-brand-DEFAULT focus:ring-brand-DEFAULT/10",
  error: "border-red-300 focus:border-red-400 focus:ring-red-50",
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean | undefined }>(
  ({ className, hasError, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputBase, hasError ? inputVariants.error : inputVariants.default, className)}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean | undefined }>(
  ({ className, hasError, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(inputBase, "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat", hasError ? inputVariants.error : inputVariants.default, className)}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = 'Select';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean | undefined }>(
  ({ className, hasError, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(inputBase, "min-h-[120px] resize-none", hasError ? inputVariants.error : inputVariants.default, className)}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';
