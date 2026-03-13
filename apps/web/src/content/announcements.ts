// ── Type Definitions ──────────────────────────────────────────
export interface Announcement {
  id: string;
  title: string;
  summary: string;
  category: 'Üyelik' | 'Yarışma' | 'Workshop' | 'Etkinlik' | 'Genel';
  date: string;
  deadline?: string | undefined;
  featured?: boolean | undefined;
  url?: string | undefined;
}

export const announcements: Announcement[] = [
  {
    id: 'ann-001',
    title: '2025–2026 Bahar Dönemi Üye Alımı Açıldı',
    summary:
      'Yönetim ekibimize ve proje gruplarımıza yeni üyeler alıyoruz. Başvuru formu ve koşullar için tıklayın.',
    category: 'Üyelik',
    date: '2026-03-12',
    deadline: '2026-03-31',
    featured: true,
    url: '/uyelik',
  },
  {
    id: 'ann-002',
    title: 'TEKNOFEST 2026 Takım Başvuruları',
    summary:
      'TEKNOFEST 2026 için kulüp takımları oluşturuluyor. Yapay Zekâ ve Yazılım kategorilerinde birlikte başvuralım.',
    category: 'Yarışma',
    date: '2026-03-08',
    deadline: '2026-03-20',
    url: '/duyurular',
  },
  {
    id: 'ann-003',
    title: 'Full Stack Web Geliştirme Serisi Başlıyor',
    summary:
      'React + Node.js + PostgreSQL odaklı 6 haftalık workshop serisi Mart ayında başlıyor. Kontenjan sınırlıdır.',
    category: 'Workshop',
    date: '2026-03-05',
    url: '/etkinlikler',
  },
  {
    id: 'ann-004',
    title: 'ARI Lab 2026 Araştırmacı Alımı',
    summary:
      'ARI Araştırma Laboratuvarımıza 2. ve 3. sınıf öğrencilerinden araştırmacı üyeler alınacak.',
    category: 'Üyelik',
    date: '2026-02-20',
    deadline: '2026-03-15',
    url: '/ari-lab',
  },
  {
    id: 'ann-005',
    title: 'Kariyer Günü: Sektör Buluşması',
    summary:
      'Yazılım ve teknoloji sektöründen profesyonellerin katılacağı kariyer günü etkinliğimiz için kayıtlar açıldı.',
    category: 'Etkinlik',
    date: '2026-02-10',
    url: '/etkinlikler',
  },
];
