'use client';

import { useState, useCallback, type FormEvent } from 'react';

interface UseFormProps<T> {
  endpoint: string;
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSuccess?: () => void;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useForm<T extends Record<string, unknown>>({
  endpoint,
  initialValues,
  validate,
  onSuccess,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((name: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value as T[keyof T] }));
  }, []);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name as string]: true }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
    setMessage('');
    setTouched({});
  }, [initialValues]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        // Mark all as touched
        const allTouched = Object.keys(initialValues).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>);
        setTouched(allTouched);
        return;
      }
    }

    setErrors({});
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus('success');
        onSuccess?.();
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(data.error || 'Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      setStatus('error');
      setMessage('Ağ hatası. Lütfen internet bağlantınızı kontrol edin.');
    }
  };

  return {
    values,
    errors,
    status,
    message,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setStatus,
    setMessage,
  };
}
