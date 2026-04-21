import type { Metadata } from 'next';
import Link from 'next/link';
import { sponsors, sponsorTierConfig, sponsorshipPackages } from '@/content/sponsors';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Sponsorlar & Partnerler | Arel Yazılım Kulübü',
  description:
    'Arel Yazılım Kulübü sponsorları ve kurumsal ortakları. Sponsorluk paketleri ve iş birliği fırsatları.',
  alternates: { canonical: '/sponsorlar' },
};

const tierOrder: Array<'platinum' | 'gold' | 'silver' | 'community'> = ['platinum', 'gold', 'silver', 'community'];

const benefits = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: '250+ Yetkin Aday',
    description: 'Yazılım mühendisliği, veri bilimi ve AI alanında yetkin öğrenciler.',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-6 h-6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    title: 'Yüksek Etkileşim',
    description: 'Kampüs içi etkinlikler, workshoplar ve hackathonlarda marka görünürlüğü.',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-6 h-6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    title: 'TEKNOFEST Deneyimi',
    description: 'Ödüllü proje ekibimizle ortak yarışma ve araştırma fırsatları.',
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" class="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    title: 'Dijital Erişim',
    description: 'Web sitesi, sosyal medya ve e-posta bültenlerinde tanıtım.',
  },
];

export default function SponsorlarPage() {
  const grouped = tierOrder.map((tier) => ({
    tier,
    config: sponsorTierConfig[tier],
    items: sponsors.filter((s) => s.tier === tier),
  }));

  return (
    <>
      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-24 lg:py-32" aria-labelledby="sponsorlar-heading">
        {/* Background elements */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="absolute -top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>

        <div className="container-site relative z-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-blue-400">
            Kurumsal İş Birlikleri
          </span>
          <h1
            id="sponsorlar-heading"
            className="mb-6 text-[clamp(36px,5.5vw,64px)] font-black leading-tight tracking-tight text-white"
          >
            Sponsorlar & <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Partnerler</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300">
            Türkiye'nin en aktif üniversite yazılım topluluklarından biriyle iş birliği yapın. 
            Yetkin yazılım geliştirici adaylarına ulaşın, markanızı genç teknoloji ekosistemine tanıtın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#paketler" 
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-7 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl"
            >
              Sponsorluk Paketleri
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            <a 
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY SPONSOR ───────────────────────────────────────────── */}
      <section className="bg-white py-20" aria-labelledby="why-heading">
        <div className="container-site">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[1.5px] text-blue-600">
              Neden Arel Yazılım?
            </span>
            <h2 id="why-heading" className="text-[clamp(28px,4vw,42px)] font-black tracking-tight text-slate-900">
              Topluluğumuza <span className="text-blue-600">Destek Olun</span>
            </h2>
            <p className="mt-4 text-base text-slate-500">
              250+ aktif üye, %100 ücretsiz üyelik ve güçlü üniversite bağlantılarıyla 
              teknoloji sektörünün gelecekteki yeteneklerine erişin.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <span dangerouslySetInnerHTML={{ __html: benefit.icon }} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT SPONSORS ───────────────────────────────────────── */}
      {grouped.map(({ tier, config, items }) =>
        items.length === 0 ? null : (
          <section 
            key={tier} 
            className={tier === 'platinum' ? 'bg-slate-50 py-20' : 'bg-white py-20'}
            aria-labelledby={`${tier}-heading`}
          >
            <div className="container-site">
              <div className="mb-10 flex items-center gap-4">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: config.bg, color: config.color }}
                >
                  {config.label}
                </span>
                <h2 id={`${tier}-heading`} className="text-2xl font-bold text-slate-900">
                  {tier === 'platinum' && 'Platinum'}
                  {tier === 'gold' && 'Gold'}
                  {tier === 'silver' && 'Silver'}
                  {tier === 'community' && 'Topluluk'} Ortaklar
                </h2>
              </div>

              <div
                className={`grid gap-6 ${
                  tier === 'platinum' ? 'sm:grid-cols-2' : 
                  tier === 'gold' ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {items.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    {/* Logo placeholder area */}
                    <div className="mb-5 flex h-16 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100">
                      <span 
                        className="text-xl font-black tracking-tight"
                        style={{ color: config.color }}
                      >
                        {sponsor.name}
                      </span>
                    </div>

                    {tier !== 'community' && (
                      <p className="mb-4 text-sm leading-relaxed text-slate-600">
                        {sponsor.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-400">
                        {sponsor.industry} · {sponsor.since}'den beri
                      </span>
                      <span 
                        className="text-sm font-semibold transition-transform group-hover:translate-x-1"
                        style={{ color: config.color }}
                      >
                        ↗
                      </span>
                    </div>

                    {/* Benefit badge */}
                    {sponsor.benefit && (
                      <div 
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {sponsor.benefit}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* ── SPONSORSHIP PACKAGES ──────────────────────────────────── */}
      <section id="paketler" className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-24" aria-labelledby="packages-heading">
        <div className="container-site">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[1.5px] text-blue-400">
              Sponsorluk
            </span>
            <h2 id="packages-heading" className="text-[clamp(28px,4vw,42px)] font-black tracking-tight text-white">
              Sponsorluk <span className="text-blue-400">Paketleri</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              İşletmenize ve markanıza uygun paketi seçin. 
              Özel talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {sponsorshipPackages.map((pkg, i) => {
              const conf = sponsorTierConfig[pkg.tier];
              const isHighlighted = i === 0;
              
              return (
                <div
                  key={pkg.tier}
                  className={`relative rounded-2xl border p-8 transition-all hover:-translate-y-1 ${
                    isHighlighted 
                      ? 'border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-indigo-900/20' 
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      En Popüler
                    </div>
                  )}
                  
                  <div className="mb-2">
                    <span 
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: conf.bg, color: conf.color }}
                    >
                      {conf.label}
                    </span>
                  </div>
                  
                  <div className="mt-6 mb-2">
                    <span className="text-3xl font-black text-white">{pkg.price}</span>
                  </div>
                  
                  <div className="my-6 h-px bg-white/10" />
                  
                  <ul className="mb-8 flex flex-col gap-3">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="mt-0.5 shrink-0 rounded-full bg-green-500/20 p-0.5" style={{ color: conf.color }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className={`block w-full rounded-xl py-3.5 text-center text-sm font-bold transition-all ${
                      isHighlighted 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'border border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    İletişime Geç
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────── */}
      <section className="bg-blue-600 py-20" aria-labelledby="final-cta">
        <div className="container-site text-center">
          <h2 id="final-cta" className="mb-4 text-[clamp(28px,4vw,42px)] font-black tracking-tight text-white">
            Birlikte Büyüyelim
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-blue-100">
            Sorularınız ve özel teklifler için ekibimizle iletişime geçin. 
            Size en uygun çözümü birlikte bulalım.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/iletisim" 
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-[15px] font-bold text-blue-600 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              İletişim Formu
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a 
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              E-posta Gönder
            </a>
          </div>
        </div>
      </section>
    </>
  );
}