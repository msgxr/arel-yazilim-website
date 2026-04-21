'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MOCK_USER } from '@/lib/mock-user';

/* ── SVG Icons ─────────────────────────────────────────────── */
function HomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function UserIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function CalendarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function SettingsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
}
function HelpIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
function LogOutIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
}
function MenuIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function XIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function ArrowLeftIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>;
}

/* ── Nav items ─────────────────────────────────────────────── */
const navItems = [
  { href: '/panel',                label: 'Genel Bakış',   Icon: HomeIcon },
  { href: '/panel/profilim',       label: 'Profilim',      Icon: UserIcon },
  { href: '/panel/etkinliklerim',  label: 'Etkinliklerim', Icon: CalendarIcon },
  { href: '/panel/ayarlar',        label: 'Ayarlar',       Icon: SettingsIcon },
];

/* ── Sidebar content (shared) ──────────────────────────────── */
function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col p-4">
      {/* User card */}
      <div className="mb-5 rounded-xl border border-brand-DEFAULT/10 bg-brand-soft p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-DEFAULT to-brand-vibrant text-sm font-black text-white">
            {MOCK_USER.initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold text-slate-900">{MOCK_USER.name}</div>
            <div className="text-[11px] text-slate-500">{MOCK_USER.faculty}</div>
          </div>
        </div>
        <div className="rounded-lg bg-white/80 px-3 py-1.5 text-[11px] text-slate-500">
          {MOCK_USER.year} · Üyelik: {MOCK_USER.joinedAt}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1" aria-label="Panel navigasyonu">
        {navItems.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              {...(onClose ? { onClick: onClose } : {})}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-brand-soft text-brand-DEFAULT'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="mt-auto border-t border-slate-200 pt-3">
        <Link
          href="/iletisim"
          {...(onClose ? { onClick: onClose } : {})}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-700"
        >
          <HelpIcon />
          Yardım
        </Link>
        {/* Logout — links to / now; will call auth.signOut() when backend connects */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-400 transition-colors hover:text-red-500"
        >
          <LogOutIcon />
          Çıkış
        </Link>
      </div>
    </div>
  );
}


/* ── Dashboard Layout ──────────────────────────────────────── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* ── Top bar ── */}
      <header
        className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm"
        aria-label="Panel üst çubuğu"
      >
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
          aria-label={sidebarOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={sidebarOpen}
          aria-controls="dashboard-sidebar"
        >
          {sidebarOpen ? <XIcon /> : <MenuIcon />}
        </button>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-700"
        >
          <ArrowLeftIcon />
          Siteye Dön
        </Link>
        <span className="text-slate-200" aria-hidden="true">|</span>
        <span className="text-sm font-extrabold text-slate-900">Üye Paneli</span>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold text-brand-DEFAULT">
            {MOCK_USER.role}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-DEFAULT to-brand-vibrant text-xs font-black text-white">
            {MOCK_USER.initials}
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-14">
        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          id="dashboard-sidebar"
          className={`fixed bottom-0 top-14 z-30 w-60 shrink-0 overflow-y-auto border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-label="Panel kenar çubuğu"
        >
          <SidebarContent pathname={pathname} onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* ── Main content ── */}
        <main
          id="panel-content"
          tabIndex={-1}
          className="flex-1 p-5 transition-all lg:ml-60 lg:p-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
