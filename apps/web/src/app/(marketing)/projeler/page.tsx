import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { projects } from '@/content/projects';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projeler',
  description: `Açık kaynak projeler ve araştırma çalışmaları — ${siteConfig.name}. Teknik üretim, yapay zekâ ve web geliştirme projeleri.`,
  alternates: { canonical: '/projeler' },
};

export default function ProjelerPage() {
  const active = projects.filter((p) => p.status === 'active' || p.status === 'development');
  const completed = projects.filter((p) => p.status === 'completed' || p.status === 'archived');

  return (
    <>
      <Section aria-labelledby="projeler-heading">
        <div className="container-site">
          <SectionHeader
            label="Teknik Üretim"
            title={<>Aktif <span className="text-orange-DEFAULT">Projeler</span></>}
            description="Kulübümüzün açık kaynak projeleri ve araştırma çalışmaları."
            id="projeler-heading"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((project) => (
              <article
                key={project.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white/85 p-6 shadow-glass backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-orange-DEFAULT hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-soft text-orange-DEFAULT">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6" aria-hidden="true">
                      <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
                    </svg>
                  </div>
                  <Badge variant={project.status === 'active' ? 'active' : 'development'}>
                    {project.status === 'active' ? 'Aktif' : 'Geliştiriliyor'}
                  </Badge>
                </div>
                <h3 className="mb-2 text-lg font-extrabold text-slate-800">{project.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[12px] text-slate-400">👥 {project.team}</span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-slate-200 px-3 py-1.5 text-[13px] font-bold text-slate-700 transition-all hover:border-orange-DEFAULT hover:text-orange-DEFAULT"
                      aria-label={`${project.title} GitHub sayfası (yeni sekmede açılır)`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {completed.length > 0 && (
        <Section variant="alt" aria-labelledby="completed-projects-heading">
          <div className="container-site">
            <SectionHeader
              label="Arşiv"
              title={<>Tamamlanan <span className="text-orange-DEFAULT">Projeler</span></>}
              id="completed-projects-heading"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {completed.map((project) => (
                <div key={project.id} className="rounded-xl border border-slate-200 bg-white p-5 opacity-70">
                  <h3 className="font-bold text-slate-700">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{project.team}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
