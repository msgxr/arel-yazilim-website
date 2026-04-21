'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/panel';
  const error = searchParams.get('error');
  
  const { login, isLoading } = useAuth();
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    
    if (result.success) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-lg shadow-blue-500/30">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase tracking-tight text-white">
              AREL YAZILIM
            </span>
            <span className="text-xs font-semibold tracking-widest text-slate-400">
              SOFTWARE CLUB
            </span>
          </div>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-black text-white">Hoş Geldiniz</h1>
            <p className="text-sm text-slate-400">
              Hesabınıza giriş yapın
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error === 'CredentialsSignin' 
                ? 'E-posta veya şifre hatalı'
                : 'Giriş sırasında bir hata oluştu'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                E-posta
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ornek@domain.com"
                required
                className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3.5 pr-12 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.83-5.83" />
                      <path d="M1 1 23 23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-700 text-blue-500" />
                <span>Beni hatırla</span>
              </label>
              <Link href="/sifre-sifirla" className="text-blue-400 hover:text-blue-300 transition-colors">
                Şifremi unuttum
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-blue-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" className="opacity-25" />
                    <path d="M12 2a10 10 0 0 1 10 10" className="opacity-75" />
                  </svg>
                  Giriş yapılıyor...
                </span>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
            Hesabın yok mu?{' '}
            <Link href="/kayit" className="font-semibold text-blue-400 hover:text-blue-300">
              Kayıt Ol
            </Link>
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">
            ← Siteye geri dön
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GirisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}