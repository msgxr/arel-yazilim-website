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

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobil Menü"
      className={`fixed left-0 right-0 bottom-0 z-40 flex flex-col bg-white/98 backdrop-blur-xl transition-all duration-300 ${
        isOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
      }`}
      style={{ top: 'calc(var(--nav-h) + var(--unibar-h))' }}
    >
      <nav aria-label="Mobil Navigasyon" className="flex-1 p-6">
        <ul className="flex flex-col gap-2">
          {NAV_LINKS.map((link, index) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={onClose}
                  className={`block rounded-xl px-4 py-4 text-lg font-bold transition-all ${
                    active
                      ? 'bg-brand-soft text-brand-DEFAULT'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-brand-DEFAULT'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-slate-100 p-6">
        <Link
          href="/uyelik"
          onClick={onClose}
          className="btn btn-primary btn-lg flex w-full items-center justify-center"
        >
          Üye Ol Hemen →
        </Link>
      </div>
    </div>
  );
}
