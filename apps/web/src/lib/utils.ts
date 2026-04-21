/**
 * @file lib/utils.ts
 * @description Proje genelinde kullanılan yardımcı fonksiyonlar.
 *
 *   - `cn`             → Tailwind sınıf birleştirici (clsx + tailwind-merge)
 *   - `formatDate`     → Türkçe tarih formatlayıcı
 *   - `formatEventDate`→ Etkinlik başlığı için üst büyük harf ay + yıl
 *   - `truncate`       → Metin kısaltma
 *   - `getInitials`    → İsimden baş harf üretimi
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind sınıflarını birleştir ve çakışmaları çöz. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Verilen ISO tarih dizesini Türkçe locale'de formatlar.
 * @example formatDate('2026-04-15')  → "15 Nisan 2026"
 */
export function formatDate(
  dateStr: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

/**
 * Etkinlik kartları için kısa tarih etiketi üretir (üst büyük harf).
 * @example formatEventDate('2026-04-15')  → "NİSAN 2026"
 */
export function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })
    .toUpperCase();
}

/**
 * Metni belirtilen uzunlukta keser, sonuna elipsis ekler.
 * @example truncate('Merhaba dünya', 8)  → "Merhaba…"
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Tam isimden baş harfleri üretir (maks 2 harf).
 * @example getInitials('Kerim Can Karadağ')  → "KCK" → ilk iki sözcük: "KC"
 */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 3);
}
