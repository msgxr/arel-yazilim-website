import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/ui/Section';
import { faqItems, siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Belgeler & SSS',
  description: `${siteConfig.name} belgeler ve sık sorulan sorular. Üyelik, etkinlik ve kulüp yönetmeliği hakkında bilgiler.`,
  alternates: { canonical: '/belgeler' },
};

export default function BelgelerPage() {
  const docs = [
    { title: 'Kulüp Tüzüğü', desc: 'Resmi yönetmelik ve idari yapı', href: '/yonetmelik', icon: '📄' },
    { title: 'Gizlilik Politikası', desc: 'KVKK ve kişisel veri politikası', href: '/gizlilik', icon: '🔒' },
    { title: 'Üyelik Kılavuzu', desc: 'Nasıl üye olunur, neler yapılır', href: '/uyelik', icon: '📋' },
    { title: 'GitHub Örgütü', desc: 'Açık kaynak projeler dizini', href: `${siteConfig.social.github}`, icon: '💻', external: true },
  ];

  return (
    <>
      <Section aria-labelledby="belgeler-heading">
        <div className="container-site">
          <SectionHeader
            label="Belgeler"
            title={<>Kulüp <span className="text-brand-DEFAULT">Belgeleri</span></>}
            description="Tüzük, politikalar ve kılavuzlar."
            id="belgeler-heading"
          />
          <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {docs.map((doc) => {
              const Tag = doc.external ? 'a' : Link;
              return (
                <Tag
                  key={doc.title}
                  href={doc.href}
                  target={doc.external ? '_blank' : undefined}
                  rel={doc.external ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-DEFAULT hover:shadow-lg"
                  aria-label={doc.external ? `${doc.title} (yeni sekmede açılır)` : doc.title}
                >
                  <span className="text-3xl" aria-hidden="true">{doc.icon}</span>
                  <div>
                    <div className="font-extrabold text-slate-800 group-hover:text-brand-DEFAULT transition-colors">{doc.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{doc.desc}</div>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </Section>

      <Section variant="alt" aria-labelledby="sss-heading">
        <div className="container-site">
          <SectionHeader
            label="SSS"
            title={<>Sık Sorulan <span className="text-brand-DEFAULT">Sorular</span></>}
            id="sss-heading"
            center
          />
          <div className="mx-auto max-w-3xl">
            {faqItems.map((item, i) => (
              <details key={i} className="group mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <summary className="flex cursor-pointer select-none items-center justify-between gap-4 p-5 font-bold text-slate-800 hover:text-brand-DEFAULT">
                  {item.question}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </summary>
                <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
