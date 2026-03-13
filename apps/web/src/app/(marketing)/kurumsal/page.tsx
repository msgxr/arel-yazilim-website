import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kurumsal',
  description: `${siteConfig.name} kurumsal kimlik, organizasyon yapısı ve departmanlar.`,
  alternates: { canonical: '/kurumsal' },
};

export default function KurumsalPage() {
  const departments = [
    { icon: '⚙️', name: 'Teknik Ekip', desc: 'Web geliştirme, altyapı ve yazılım projeleri.' },
    { icon: '📊', name: 'Veri & AI Ekibi', desc: 'Veri bilimi, ML modelleri ve araştırma projeleri.' },
    { icon: '🎨', name: 'Tasarım & İçerik', desc: 'UI/UX tasarım, sosyal medya içeriği ve görsel kimlik.' },
    { icon: '📣', name: 'Sosyal Medya', desc: 'Platform yönetimi, içerik üretimi ve topluluk etkileşimi.' },
    { icon: '🤝', name: 'Sponsor & İş Birliği', desc: 'Kurumsal ortaklıklar, sponsorluk ve etkinlik finansmanı.' },
    { icon: '🎉', name: 'Etkinlik Organizasyon', desc: 'Workshop, seminer, panel ve hackathon organizasyonu.' },
  ];

  return (
    <>
      <Section aria-labelledby="kurumsal-heading">
        <div className="container-site">
          <SectionHeader
            label="Organizasyon"
            title={<>Kurumsal <span className="text-orange-DEFAULT">Yapı</span></>}
            description={`${siteConfig.name} organizasyon şeması ve departman tanımları.`}
            id="kurumsal-heading"
          />
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <div key={d.name} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="mt-0.5 text-2xl" aria-hidden="true">{d.icon}</span>
                <div>
                  <h3 className="mb-1 font-extrabold text-slate-800">{d.name}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-orange-DEFAULT/30 bg-orange-soft p-8 text-center">
            <h2 className="mb-3 text-2xl font-extrabold text-slate-800">Kurumsal İş Birliği</h2>
            <p className="mx-auto mb-6 max-w-[480px] text-slate-600">
              Etkinlik sponsorluğu, teknik mentörlük veya uzun vadeli kurumsal ortaklık için bize ulaşın.
            </p>
            <Link href="/iletisim" className="inline-flex items-center gap-2.5 rounded-md bg-orange-DEFAULT px-8 py-3.5 font-bold text-white transition-all hover:bg-orange-vibrant">
              Teklif Gönder
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
