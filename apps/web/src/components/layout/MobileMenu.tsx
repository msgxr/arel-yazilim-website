'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { mobileNavLinks as NAV_LINKS } from '@/content/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 'calc(var(--nav-h) + var(--unibar-h))' }}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil Menü"
        className={`fixed left-0 right-0 z-50 flex flex-col bg-white shadow-2xl transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-full'
        }`}
        style={{ top: 0 }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <span className="text-[15px] font-black tracking-tight text-slate-900">
              AREL YAZILIM
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobil Navigasyon" className="flex-1 overflow-y-auto p-5">
          <ul className="flex flex-col gap-1.5" role="list">
            {NAV_LINKS.map((link, index) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[16px] font-semibold transition-all ${
                      active
                        ? 'bg-brand-DEFAULT text-white'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-brand-DEFAULT'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    {active && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-auto h-4 w-4 opacity-60" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-5 pb-8">
          <Link
            href="/uyelik"
            onClick={onClose}
            className="btn btn-primary btn-lg flex w-full items-center justify-center gap-2 text-[15px]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            Üye Ol — Ücretsiz Başvuru
          </Link>
          <p className="mt-3 text-center text-[12px] text-slate-400">
            Tüm İstanbul Arel Üniversitesi öğrencilerine açık
          </p>
        </div>
      </div>
    </>
  );
}