import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Kariyer',
  description: `${siteConfig.name} kariyer fırsatları — staj, iş ilanları ve kariyer etkinlikleri.`,
  alternates: { canonical: '/kariyer' },
};

export default function KariyerPage() {
  const services = [
    { icon: '💼', title: 'Staj Ağı', desc: 'Partner firmalarla staj bağlantıları ve referans desteği.' },
    { icon: '📝', title: 'CV & LinkedIn Danışmanlığı', desc: 'Özgeçmiş inceleme, profil optimizasyonu ve kariyer koçluğu.' },
    { icon: '🎤', title: 'Sektör Etkinlikleri', desc: 'Firma temsilcileri ve alumni ile networking etkinlikleri.' },
    { icon: '🏆', title: 'Hackathon Katılımı', desc: 'Kulüp takımlarıyla ulusal yarışmalara katılım desteği.' },
  ];

  return (
    <Section aria-labelledby="kariyer-heading">
      <div className="container-site">
        <SectionHeader
          label="Kariyer"
          title={<>Kariyer <span className="text-orange-DEFAULT">Fırsatları</span></>}
          description="Arel Yazılım Kulübü üyeleri için staj, kariyer danışmanlığı ve networking imkânları."
          id="kariyer-heading"
        />
        <div className="mb-12 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="mt-0.5 shrink-0 text-3xl" aria-hidden="true">{s.icon}</span>
              <div>
                <h3 className="mb-1 font-extrabold text-slate-800">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-orange-DEFAULT/30 bg-orange-soft p-8 text-center">
          <h2 className="mb-2 text-2xl font-extrabold text-slate-800">İş İlanı Paylaşımı</h2>
          <p className="mx-auto mb-5 max-w-[440px] text-sm text-slate-600">
            Öğrencilerimize yönelik staj veya iş ilanı paylaşmak isteyen firmalar e-posta ile iletişime geçebilir.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=İş İlanı Paylaşımı`}
            className="inline-flex items-center gap-2.5 rounded-md bg-orange-DEFAULT px-8 py-3.5 font-bold text-white transition-all hover:bg-orange-vibrant"
          >
            İlan Gönder
          </a>
        </div>
      </div>
    </Section>
  );
}
