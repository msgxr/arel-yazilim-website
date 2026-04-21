import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import { siteConfig, faqItems } from '@/content/site';
import MembershipForm from '@/features/membership/MembershipForm';

export const metadata: Metadata = {
  title: 'Üyelik Başvurusu',
  description: `${siteConfig.name}'e ücretsiz üye ol. Proje grupları, etkinlikler ve kariyer ağı — tüm İstanbul Arel Üniversitesi öğrencilerine açık.`,
  alternates: { canonical: '/uyelik' },
};

/* ── Benefits data ─────────────────────────────────────────── */
const BENEFITS = [
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
] as const;

/* ── Stats ── */
const STATS = [
  { value: '250+', label: 'Aktif Üye'   },
  { value: '40+',  label: 'Etkinlik'    },
  { value: '%100', label: 'Ücretsiz'    },
  { value: '2022', label: 'Kuruluş'     },
] as const;

/* ─────────────────────────────────────────────────────────────── */
export default function UyelikPage() {
  return (
    <>
      {/* ── HERO + FORM ─────────────────────────────────────── */}
      <Section aria-labelledby="uyelik-heading">
        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-[1fr_480px]">

            {/* ── Left: info ── */}
            <div>
              <SectionHeader
                label="Başvuru"
                title={<>Aramıza <span className="text-brand-DEFAULT">Katıl</span></>}
                description="Üyelik tamamen ücretsiz ve tüm İstanbul Arel Üniversitesi öğrencilerine açıktır. Başvurun 1–3 iş günü içinde değerlendirilir."
                id="uyelik-heading"
              />

              {/* Stats bar */}
              <div className="mb-10 grid grid-cols-4 divide-x divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="py-5 text-center">
                    <div className="text-[22px] font-black text-brand-DEFAULT">{value}</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-slate-500">{label}</div>
                  </div>
                ))}
              </div>

              {/* Benefits grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <div
                    key={b.title}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-DEFAULT/30 hover:shadow-md"
                  >
                    <span className="shrink-0 text-2xl" aria-hidden="true">{b.icon}</span>
                    <div>
                      <div className="mb-1 font-bold text-slate-800">{b.title}</div>
                      <p className="text-sm leading-relaxed text-slate-500">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <MembershipForm />
            </div>
          </div>
        </div>
      </Section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <Section variant="alt" aria-labelledby="faq-heading">
        <div className="container-site">
          <SectionHeader
            label="SSS"
            title={<>Sık Sorulan <span className="text-brand-DEFAULT">Sorular</span></>}
            id="faq-heading"
            center
          />
          <div className="mx-auto max-w-3xl">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer select-none items-center justify-between gap-4 p-5 font-bold text-slate-800 hover:text-brand-DEFAULT">
                  {item.question}
                  <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
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
