// ── Type Definitions ──────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'development' | 'completed' | 'archived';
  techStack: string[];
  team: string;
  githubUrl?: string | undefined;
  liveUrl?: string | undefined;
  featured?: boolean | undefined;
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'Kulüp Web Portalı',
    description:
      'Arel Yazılım Kulübü\'nün resmî web portalı. Next.js, TypeScript ve Tailwind CSS ile geliştirilmiş açık kaynak proje.',
    status: 'active',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    team: 'Web Ekibi',
    githubUrl: 'https://github.com/ArelSoftwareClub/website',
    featured: true,
  },
  {
    id: 'proj-002',
    title: 'VARIANT-GNN',
    description:
      'Graf Sinir Ağı tabanlı varyant analiz modeli. TEKNOFEST Yapay Zekâ kategorisi araştırma projesi.',
    status: 'development',
    techStack: ['Python', 'PyTorch', 'GNN', 'Streamlit'],
    team: 'AI Ekibi',
    githubUrl: 'https://github.com/ArelSoftwareClub',
    featured: true,
  },
  {
    id: 'proj-003',
    title: 'Veri Analizi Araç Seti',
    description:
      'Öğrencilerin veri bilimi projelerinde kullanabileceği Python tabanlı eğitim amaçlı açık kaynak araç seti.',
    status: 'development',
    techStack: ['Python', 'Pandas', 'Plotly', 'NumPy'],
    team: 'Veri Ekibi',
  },
  {
    id: 'proj-004',
    title: 'Arel Smart Campus',
    description:
      'Kampüs içi enerji yönetimini optimize eden IoT tabanlı akıllı sistem prototipi.',
    status: 'development',
    techStack: ['React', 'Node.js', 'IoT', 'MQTT'],
    team: 'Donanım & IoT Ekibi',
    githubUrl: 'https://github.com/ArelSoftwareClub',
  },
  {
    id: 'proj-005',
    title: 'ARI Lab Araştırma Platformu',
    description:
      'Kulüp araştırma faaliyetlerini koordine eden, literatür takibi ve proje yönetimini bir araya getiren platform.',
    status: 'development',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    team: 'ARI Lab Ekibi',
  },
];
