import type { Metadata } from 'next';
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/ui/Section';
import { siteConfig, faqItems } from '@/content/site';

export const metadata: Metadata = {
  title: 'Üyelik Başvurusu',
  description: `${siteConfig.name}'e ücretsiz üye ol. Proje grupları, etkinlikler ve kariyer ağı — tüm İstanbul Arel Üniversitesi öğrencilerine açık.`,
  alternates: { canonical: '/uyelik' },
};

const benefits = [
  {
    icon: '🚀',
    title: 'Gerçek Projelerde Yer Al',
    description: 'Özgeçmişine değer katacak, GitHub profilini şekillendirecek gerçek açık kaynak projelerde çalış.',
  },
  {
    icon: '🎓',
    title: 'Workshop & Eğitimler',
    description: 'Sektör profesyonellerinin anlattığı ücretsiz teknik eğitim programlarına katıl.',
  },
  {
    icon: '🏆',
    title: 'Hackathon & Yarışmalar',
    description: 'TEKNOFEST, ulusal ve uluslararası hackathonlarda kulüp ekibiyle yarış.',
  },
  {
    icon: '🤝',
    title: 'Kariyer Ağı',
    description: 'Sektör bağlantıları, staj fırsatları ve mentorluk programlarına erişim.',
  },
  {
    icon: '💡',
    title: 'ARI Lab & Araştırma',
    description: 'Yapay zekâ ve veri bilimi odaklı akademik araştırma ekibine katıl.',
  },
  {
    icon: '🎉',
    title: 'Sosyal Topluluk',
    description: 'Aynı ilgi alanlarını paylaşan yüzlerce öğrenciyle bağlantı kur.',
  },
];

export default function UyelikPage() {
  return (
    <>
      <Section aria-labelledby="uyelik-heading">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Content */}
            <div>
              <SectionHeader
                label="Başvuru"
                title={<>Aramıza <span className="text-orange-DEFAULT">Katıl</span></>}
                description="Üyelik tamamen ücretsiz ve tüm İstanbul Arel Üniversitesi öğrencilerine açıktır."
                id="uyelik-heading"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <span className="shrink-0 text-2xl" aria-hidden="true">{b.icon}</span>
                    <div>
                      <div className="mb-1 font-bold text-slate-800">{b.title}</div>
                      <p className="text-sm leading-relaxed text-slate-500">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside aria-label="Üyelik Başvurusu">
              <div className="sticky top-24 rounded-2xl border border-orange-DEFAULT/30 bg-orange-soft p-8">
                <div className="mb-4 text-4xl" aria-hidden="true">🎓</div>
                <h2 className="mb-3 text-2xl font-extrabold text-slate-800">
                  Hemen Başvur
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                  E-posta ile başvurunu gönder. Yönetim ekibimiz en kısa sürede seninle iletişime geçecek.
                </p>
                <a
                  href={`mailto:${siteConfig.email}?subject=Üyelik Başvurusu&body=Merhaba, üyelik başvurusunda bulunmak istiyorum.%0A%0AAdım:%0ABölüm:%0ASınıf:%0AMotivasyonum:`}
                  className="mb-5 flex w-full items-center justify-center gap-2.5 rounded-md bg-orange-DEFAULT px-6 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-vibrant hover:shadow-orange-lg"
                >
                  E-posta ile Başvur
                </a>
                <p className="text-center text-xs text-slate-400">veya</p>
                <Link
                  href="/iletisim"
                  className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-all hover:border-orange-DEFAULT"
                >
                  İletişim Formu
                </Link>
                <div className="mt-6 rounded-lg bg-white/70 p-4 text-center text-xs text-slate-500">
                  📅 Yanıt süresi: 1–3 iş günü
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="alt" aria-labelledby="faq-heading">
        <div className="container-site">
          <SectionHeader
            label="SSS"
            title={<>Sık Sorulan <span className="text-orange-DEFAULT">Sorular</span></>}
            id="faq-heading"
            center
          />
          <div className="mx-auto max-w-3xl">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer select-none items-center justify-between gap-4 p-5 font-bold text-slate-800 hover:text-orange-DEFAULT">
                  {item.question}
                  <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
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
