'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminContent({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris?callbackUrl=/admin');
    } else if (status === 'authenticated' && !['ADMIN', 'SUPER_ADMIN'].includes(session?.user?.role || '')) {
      router.push('/panel');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return null;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    { href: '/admin/kullanicilar', label: 'Kullanıcılar', icon: '👥' },
    { href: '/admin/basvurular', label: 'Başvurular', icon: '📝' },
    { href: '/admin/etkinlikler', label: 'Etkinlikler', icon: '📅' },
    { href: '/admin/duyurular', label: 'Duyurular', icon: '📢' },
    { href: '/admin/analitik', label: 'İstatistikler', icon: '📈' },
  ];

  return (
    <div className="flex min-h-[80vh]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-900 p-4">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
            A
          </div>
          <div>
            <div className="text-sm font-bold text-white">Admin Panel</div>
            <div className="text-xs text-slate-500">Yönetim</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Back to site */}
        <div className="mt-auto pt-4 border-t border-slate-800">
          <Link
            href="/panel"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <span>←</span>
            Üye Paneli
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <span>🏠</span>
            Siteye Dön
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-slate-950 p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Suspense fallback={
      <div className="flex min-h-[80vh] items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    }>
      <AdminContent>{children}</AdminContent>
    </Suspense>
  );
}