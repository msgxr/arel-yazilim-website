import { siteConfig } from '@/content/site';

export default function UniversityBar() {
  return (
    <div
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--border)',
        padding: '8px 0',
      }}
      role="complementary"
      aria-label="Üniversite Bilgi Bandı"
    >
      <div className="container-site">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-2)',
        }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'var(--orange-soft)',
              color: 'var(--orange)',
              fontWeight: 800,
            }}>
              {/* Graduation cap icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Resmî Kulüp
            </span>
            <span style={{ color: 'var(--border)' }} aria-hidden="true">
              |
            </span>
            <span className="hidden-mobile">
              {siteConfig.university} · {siteConfig.office}
            </span>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href={siteConfig.universityUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'inherit',
                textDecoration: 'none',
              }}
              aria-label="Üniversite Ana Sayfa (yeni sekmede açılır)"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              <span>Üniversite</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'inherit',
                textDecoration: 'none',
              }}
              className="hidden-mobile"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
