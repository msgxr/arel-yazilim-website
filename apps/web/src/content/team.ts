/**
 * @file content/team.ts
 * @description Yönetim kadrosu ve departman verileri.
 *
 * Kullanım:
 *   - `managementTeam`  → Ana sayfa hero + /ekip sayfası
 *   - `departments`     → /ekip sayfası departman listesi
 *
 * Auth sistemi devreye girdiğinde bu statik veri API'dan çekilecek.
 */

// ── Type Definitions ───────────────────────────────────────────

export interface Member {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  year: string;
  faculty: string;
  linkedin?: string | undefined;
  github?: string | undefined;
  email?: string | undefined;
  featured?: boolean | undefined; // shown on home page preview
}

export type TeamDepartment = {
  name: string;
  members: Member[];
};

export const managementTeam: Member[] = [
  {
    id: 'mem-001',
    name: 'Kerim Can Karadağ',
    initials: 'KCK',
    role: 'Başkan',
    department: 'Yönetim',
    year: '2. Sınıf',
    faculty: 'Yazılım Müh.',
    linkedin: 'http://linkedin.com/in/kerim-can-karadağ-ab041a359',
    featured: true,
  },
  {
    id: 'mem-002',
    name: 'Mahsun Ulusal',
    initials: 'MU',
    role: 'Başkan Yardımcısı',
    department: 'Yönetim',
    year: '2. Sınıf',
    faculty: 'Yazılım Müh.',
    github: 'https://github.com/MahsunUlusal',
    featured: true,
  },
  {
    id: 'mem-003',
    name: 'Muhammed Sina Gün',
    initials: 'MSG',
    role: 'Genel Koordinatör',
    department: 'Yönetim',
    year: '2. Sınıf',
    faculty: 'Bilgisayar Müh.',
    github: 'https://github.com/msgxr',
    linkedin: 'https://www.linkedin.com/in/muhammedsina',
    featured: true,
  },
  {
    id: 'mem-004',
    name: 'Eren Bahadır',
    initials: 'ERB',
    role: 'CTO',
    department: 'Yönetim',
    year: '3. Sınıf',
    faculty: 'Bilgisayar Müh.',
    email: 'erenbahadir@cloudly.com.tr',
    featured: true,
  },
];

export const departments: TeamDepartment[] = [
  {
    name: 'Teknik Ekip',
    members: [
      {
        id: 'mem-t001',
        name: 'Web Geliştirme Sorumlusu',
        initials: 'WG',
        role: 'Teknik Sorumlu',
        department: 'Teknik',
        year: '2. Sınıf',
        faculty: 'Yazılım Müh.',
      },
    ],
  },
  {
    name: 'İçerik & Tasarım',
    members: [
      {
        id: 'mem-c001',
        name: 'İçerik Sorumlusu',
        initials: 'IS',
        role: 'İçerik Sorumlusu',
        department: 'İçerik',
        year: '1. Sınıf',
        faculty: 'İletişim',
      },
    ],
  },
  {
    name: 'Sosyal Medya',
    members: [],
  },
  {
    name: 'Sponsorluk & İş Birlikleri',
    members: [],
  },
];
