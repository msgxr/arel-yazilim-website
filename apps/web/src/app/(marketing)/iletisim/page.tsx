import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import ContactForm from '@/features/contact-form/ContactForm';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'İletişim',
  description: `${siteConfig.name} ile iletişime geçin. İş birliği, üyelik ve etkinlik sorularınız için bize yazın.`,
  alternates: { canonical: '/iletisim' },
};

export default function IletisimPage() {
  const contacts = [
    {
      label: 'E-posta',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: '✉',
    },
    {
      label: 'Adres',
      value: siteConfig.campus,
      href: 'https://maps.google.com',
      icon: '📍',
    },
    {
      label: 'Instagram',
      value: '@arel.yazilim',
      href: siteConfig.social.instagram,
      icon: '📷',
    },
    {
      label: 'LinkedIn',
      value: 'Arel Yazılım Kulübü',
      href: siteConfig.social.linkedin,
      icon: '💼',
    },
  ];

  return (
    <Section aria-labelledby="iletisim-heading">
      <div className="container-site">
        <SectionHeader
          label="İletişim"
          title={<>Bize <span className="text-orange-DEFAULT">Ulaşın</span></>}
          description="İş birliği, üyelik, etkinlik veya genel sorularınız için bize yazın."
          id="iletisim-heading"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <aside aria-label="İletişim Bilgileri">
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-glass">
              <h3 className="mb-5 text-lg font-extrabold text-slate-800">İletişim Bilgileri</h3>
              <ul className="flex flex-col gap-4" role="list">
                {contacts.map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-soft text-base" aria-hidden="true">
                      {c.icon}
                    </span>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">{c.label}</div>
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-medium text-slate-700 transition-colors hover:text-orange-DEFAULT"
                      >
                        {c.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-orange-DEFAULT/30 bg-orange-soft p-6">
              <h3 className="mb-2 font-extrabold text-orange-DEFAULT">🤝 Kurumsal İş Birliği</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                Etkinlik sponsorluğu, teknik mentörlük veya kurumsal ortaklık için:
              </p>
              <a
                href={`mailto:${siteConfig.email}?subject=Kurumsal İş Birliği`}
                className="inline-flex items-center gap-2 rounded-md bg-orange-DEFAULT px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-vibrant"
              >
                İş Birliği Teklifi Gönder
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
