/**
 * @file lib/mock-user.ts
 * @description Geçici (placeholder) üye verisi.
 *
 * Dashboard sayfaları için merkezi mock auth şablonu.
 * Backend / auth sistemi (JWT, NextAuth, vb.) hazır olduğunda
 * bu dosya `useSession()` veya bir auth context hook'u ile değiştirilecek.
 *
 * Kullanım:
 *   import { MOCK_USER } from '@/lib/mock-user';
 *
 * @todo Gerçek auth entegrasyonu yapıldığında bu dosyayı kaldır.
 */

export const MOCK_USER = {
  name:        'Örnek Üye',
  initials:    'ÖÜ',
  role:        'Üye',
  faculty:     'Yazılım Müh.',
  department:  'Yazılım Mühendisliği',
  year:        '2. Sınıf',
  joinedAt:    'Ekim 2024',
  email:       'ornek.uye@istanbularel.edu.tr',
  github:      'github.com/ornek-uye',
  linkedin:    'linkedin.com/in/ornek-uye',
  bio:         'Full-stack geliştirme ve makine öğrenmesi ilgi alanlarım. Web Ekibi üyesi.',
  interests:   ['Web Geliştirme', 'Yapay Zeka', 'Open Source'] as const,
  skills:      ['React', 'TypeScript', 'Python', 'Node.js'] as const,
} as const;

export type MockUser = typeof MOCK_USER;
