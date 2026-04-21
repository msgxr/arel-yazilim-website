'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris?callbackUrl=/panel');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const navItems = [
    { href: '/panel', label: 'Ana Sayfa', icon: '🏠' },
    { href: '/panel/profil', label: 'Profilim', icon: '👤' },
    { href: '/panel/basvurularim', label: 'Başvurularım', icon: '📋' },
    { href: '/panel/etkinliklerim', label: 'Etkinliklerim', icon: '📅' },
    { href: '/panel/ayarlar', label: 'Ayarlar', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-[80vh]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white p-4">
        {/* User info */}
        <div className="mb-6 flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
            {session.user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-slate-900">{session.user.name}</div>
            <div className="truncate text-xs text-slate-500">{session.user.email}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Admin link */}
        {(session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN') && (
          <>
            <div className="my-4 border-t border-slate-200" />
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-600"
            >
              <span>⚡</span>
              Admin Paneli
            </Link>
          </>
        )}

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-slate-200">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <span>🚪</span>
            Çıkış Yap
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Suspense fallback={
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    }>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}