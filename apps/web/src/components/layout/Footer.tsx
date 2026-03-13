import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: 'Hızlı Bağlantılar',
      links: [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/hakkimizda', label: 'Kurumsal' },
        { href: '/etkinlikler', label: 'Etkinlikler' },
        { href: '/projeler', label: 'Projeler' },
        { href: '/kariyer', label: 'Kariyer' },
        { href: '/ekip', label: 'Yönetim Ekibi' },
      ],
    },
    {
      heading: 'Katılım',
      links: [
        { href: '/uyelik', label: 'Üyelik Başvurusu' },
        { href: '/ari-lab', label: 'ARI Lab' },
        { href: '/belgeler', label: 'Tüzük / Yönetmelik' },
        { href: '/belgeler', label: 'SSS / Belgeler' },
        { href: '/kurumsal', label: 'Kurumsal Ortaklık' },
      ],
    },
    {
      heading: 'İletişim & Sosyal',
      links: [
        { href: `mailto:${siteConfig.email}`, label: 'E-posta Gönder', external: true },
        { href: '/iletisim', label: 'İletişim Formu' },
        { href: siteConfig.social.instagram, label: 'Instagram', external: true },
        { href: siteConfig.social.linkedin, label: 'LinkedIn', external: true },
        { href: siteConfig.social.github, label: 'GitHub', external: true },
      ],
    },
    {
      heading: 'Politika & Yasal',
      links: [
        { href: '/gizlilik', label: 'Gizlilik Politikası' },
        { href: '/belgeler', label: 'KVKK Aydınlatma' },
        { href: '/belgeler', label: 'Kullanım Koşulları' },
        { href: '/belgeler', label: 'Çerez Politikası' },
        { href: 'https://www.istanbularel.edu.tr', label: 'Arel Üniversitesi', external: true },
      ],
    },
  ];

  return (
    <footer style={{ background: '#0A0C0F', color: '#fff' }} aria-label="Site altbilgisi">
      <div className="container-site" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Image
                src="/images/arel-logo.png"
                alt="Arel Yazılım Kulübü"
                width={40}
                height={40}
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
              <span style={{ fontWeight: 800, fontSize: '16px', color: '#fff' }}>Arel Yazılım</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '20px' }}>
              İstanbul Arel Üniversitesi resmî öğrenci yazılım kulübü.
              Girişimcilik ve Liderlik Ofisi ekosisteminde teknoloji üretimi.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: siteConfig.social.instagram, label: 'Instagram', icon: '📸' },
                { href: siteConfig.social.linkedin, label: 'LinkedIn', icon: '💼' },
                { href: siteConfig.social.github, label: 'GitHub', icon: '💻' },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="footer-social-btn"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h3 style={{
                fontSize: '11px', fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)',
                marginBottom: '16px',
              }}>
                {col.heading}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} role="list">
                {col.links.map(({ href, label, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="footer-link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)' }}>
            © {year} Arel Yazılım Kulübü · İstanbul Arel Üniversitesi Resmî Öğrenci Kulübü
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { href: '/gizlilik', label: 'Gizlilik' },
              { href: '/belgeler', label: 'KVKK' },
              { href: '/belgeler', label: 'Kullanım Koşulları' },
            ].map(({ href, label }) => (
              <Link key={label} href={href} style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.30)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
