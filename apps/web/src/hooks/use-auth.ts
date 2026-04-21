'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          return { success: false, error: 'E-posta veya şifre hatalı' };
        }

        router.push('/panel');
        router.refresh();
        return { success: true };
      } catch {
        return { success: false, error: 'Giriş sırasında bir hata oluştu' };
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      department: string;
      year: string;
      interests: string[];
      motivation: string;
      kvkkConsent: boolean;
    }) => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          return { success: false, error: json.error || 'Kayıt başarısız' };
        }

        // Auto login after register
        await login(data.email, data.password);
        return { success: true };
      } catch {
        return { success: false, error: 'Kayıt sırasında bir hata oluştu' };
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isAdmin: session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN',
    isMember: session?.user?.role === 'MEMBER' || session?.user?.role === 'MODERATOR' || session?.user?.role === 'ADMIN',
    status,
    isLoading,
    login,
    logout,
    register,
    update,
  };
}