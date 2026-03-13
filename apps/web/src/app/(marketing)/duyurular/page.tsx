import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/ui/Section';
import { announcements } from '@/content/announcements';
import { AnnouncementBadge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Duyurular',
  description: `Arel Yazılım Kulübü duyuruları — üyelik, etkinlik, yarışma ve genel duyurular. ${siteConfig.name}.`,
  alternates: { canonical: '/duyurular' },
};

export default function DuyurularPage() {
  const featured = announcements.filter((a) => a.featured);
  const regular = announcements.filter((a) => !a.featured);

  return (
    <Section aria-labelledby="duyurular-heading">
      <div className="container-site">
        <SectionHeader
          label="Güncel"
          title={<>Son <span className="text-orange-DEFAULT">Duyurular</span></>}
          description="Üyelik, etkinlik, yarışma ve kulüp haberleri."
          id="duyurular-heading"
        />

        {/* Featured */}
        {featured.map((ann) => (
          <Link
            key={ann.id}
            href={ann.url ?? '#'}
            className="group mb-6 flex items-start gap-5 rounded-xl border border-orange-DEFAULT/30 bg-orange-soft p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex-1 min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px]">
                <AnnouncementBadge category={ann.category as 'Üyelik' | 'Yarışma' | 'Workshop' | 'Etkinlik' | 'Genel'} />
                <span className="text-slate-400">{formatDate(ann.date)}</span>
                {ann.deadline && (
                  <span className="font-bold text-orange-DEFAULT">Son Başvuru: {formatDate(ann.deadline)}</span>
                )}
              </div>
              <div className="mb-2 text-lg font-extrabold text-slate-800 group-hover:text-orange-DEFAULT transition-colors">
                {ann.title}
              </div>
              <p className="text-sm leading-relaxed text-slate-500">{ann.summary}</p>
            </div>
            <span className="shrink-0 font-bold text-orange-DEFAULT">Başvur →</span>
          </Link>
        ))}

        {/* Regular list */}
        <div className="flex flex-col gap-4">
          {regular.map((ann) => (
            <Link
              key={ann.id}
              href={ann.url ?? '#'}
              className="group flex items-start gap-5 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-orange-DEFAULT/30 hover:shadow-md"
            >
              <div className="flex-1 min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[12px]">
                  <AnnouncementBadge category={ann.category as 'Üyelik' | 'Yarışma' | 'Workshop' | 'Etkinlik' | 'Genel'} />
                  <span className="text-slate-400">{formatDate(ann.date)}</span>
                  {ann.deadline && (
                    <span className="font-semibold text-orange-DEFAULT">Son Başvuru: {formatDate(ann.deadline)}</span>
                  )}
                </div>
                <div className="font-bold text-slate-800 group-hover:text-orange-DEFAULT transition-colors">
                  {ann.title}
                </div>
                <p className="mt-1 text-sm text-slate-500">{ann.summary}</p>
              </div>
              <span className="shrink-0 text-sm font-bold text-orange-DEFAULT opacity-0 transition-opacity group-hover:opacity-100">
                İncele →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
