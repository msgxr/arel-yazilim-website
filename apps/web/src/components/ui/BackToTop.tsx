'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="back-to-top"
      onClick={scrollToTop}
      aria-label="Sayfanın başına git"
      className={`fixed bottom-7 right-7 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-orange-DEFAULT text-white shadow-orange-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-vibrant focus-visible:outline-2 focus-visible:outline-orange-DEFAULT ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
