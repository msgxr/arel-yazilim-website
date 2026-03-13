// ── Type Definitions ──────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  date: string; // ISO 8601
  endDate?: string | undefined;
  type: 'Workshop' | 'Hackathon' | 'Seminar' | 'Panel' | 'Social' | 'Training';
  location: string;
  isOnline: boolean;
  capacity?: number | undefined;
  speaker?: string | undefined;
  description: string;
  tags: string[];
  registrationUrl?: string | undefined;
  status: 'upcoming' | 'ongoing' | 'past';
  featured?: boolean | undefined;
}

export const events: Event[] = [
  {
    id: 'evt-001',
    title: 'Full Stack Web Geliştirme Serisi',
    date: '2026-04-05',
    endDate: '2026-05-17',
    type: 'Workshop',
    location: 'Büyükçekmece Kampüsü · B Blok',
    isOnline: false,
    capacity: 30,
    description:
      'React, Node.js ve PostgreSQL ile modern uçtan uca web uygulama geliştirme. 6 haftalık yoğun program.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Full Stack'],
    status: 'upcoming',
    featured: true,
  },
  {
    id: 'evt-002',
    title: 'Hackathon Hazırlık Kampı',
    date: '2026-04-19',
    endDate: '2026-04-20',
    type: 'Hackathon',
    location: 'Arel Üniversitesi',
    isOnline: false,
    capacity: 30,
    description:
      'TEKNOFEST ve ulusal hackathon yarışmalarına hazırlık amacıyla düzenlenen iki günlük yoğun proje kampı.',
    tags: ['Hackathon', 'TEKNOFEST', 'Proje'],
    status: 'upcoming',
  },
  {
    id: 'evt-003',
    title: 'Yapay Zekâ ve Kariyer Yol Haritası',
    date: '2026-05-10',
    type: 'Panel',
    location: 'Arel Üniversitesi · Konferans Salonu',
    isOnline: false,
    description:
      'Sektör profesyonelleriyle yapay zekâ kariyeri, staj süreçleri ve iş başvuru stratejileri üzerine panel.',
    tags: ['AI', 'Kariyer', 'Staj'],
    status: 'upcoming',
  },
  {
    id: 'evt-004',
    title: 'İşlemcilerin İsimlendirilmesi',
    date: '2025-11-20',
    type: 'Seminar',
    location: 'Büyükçekmece Kampüsü',
    isOnline: false,
    capacity: 80,
    description: 'CPU ve GPU mimarilerindeki isimlendirme standartları ve sektörel önemi üzerine seminer.',
    tags: ['Hardware', 'CPU', 'GPU'],
    status: 'past',
  },
  {
    id: 'evt-005',
    title: 'AI Trendleri Semineri',
    date: '2025-10-15',
    type: 'Seminar',
    location: 'Büyükçekmece Kampüsü',
    isOnline: false,
    capacity: 100,
    description: 'Yapay zekâ alanındaki son gelişmeler ve 2026 trendleri üzerine kapsamlı sunum.',
    tags: ['AI', 'Machine Learning', 'Trends'],
    status: 'past',
  },
  {
    id: 'evt-006',
    title: 'Python ile Veri Analizi Workshop',
    date: '2025-12-10',
    type: 'Workshop',
    location: 'Büyükçekmece Kampüsü · Bilgisayar Laboratuvarı',
    isOnline: false,
    capacity: 25,
    speaker: 'AYK Teknik Ekibi',
    description: 'Pandas, NumPy ve Matplotlib ile veri analizi ve görselleştirme workshop.',
    tags: ['Python', 'Pandas', 'Data Science'],
    status: 'past',
  },
  {
    id: 'evt-007',
    title: 'Git & GitHub Workshop',
    date: '2025-09-25',
    type: 'Workshop',
    location: 'Büyükçekmece Kampüsü',
    isOnline: false,
    description: 'Versiyon kontrol sistemleri, iş akışları ve açık kaynak katkı süreçleri.',
    tags: ['Git', 'GitHub', 'DevOps'],
    status: 'past',
  },
  {
    id: 'evt-008',
    title: 'İstanbul Üniversite Hackathonu',
    date: '2025-05-18',
    endDate: '2025-05-19',
    type: 'Hackathon',
    location: 'İstanbul',
    isOnline: false,
    description: 'Kulübümüzün ödüllü hackathon katılımı. "En İyi Sunum" ödülü kazanıldı.',
    tags: ['Hackathon', 'Ödül', 'Proje'],
    status: 'past',
    featured: true,
  },
];
