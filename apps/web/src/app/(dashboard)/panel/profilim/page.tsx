import type { Metadata } from 'next';
import { MOCK_USER } from '@/lib/mock-user';

export const metadata: Metadata = { title: 'Profilim | Üye Paneli' };

/* ─────────────────────────────────────────────────────────────── */
export default function ProfilimPage() {
  const u = MOCK_USER;

  return (
    <div className="space-y-8">

      {/* ── Page title ── */}
      <div>
        <h1 className="mb-1.5 text-2xl font-black tracking-tight text-slate-900">Profilim</h1>
        <p className="text-sm text-slate-500">Profil bilgilerini görüntüle ve düzenle.</p>
      </div>

      {/* ── Two-column grid ── */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">

        {/* ── Sidebar ── */}
        <div className="space-y-4">

          {/* Avatar + info card */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {/* Cover gradient */}
            <div className="h-20 bg-gradient-to-br from-brand-DEFAULT to-brand-vibrant" />
            <div className="px-6 pb-6" style={{ marginTop: '-28px' }}>
              {/* Avatar */}
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-brand-DEFAULT to-brand-vibrant text-lg font-black text-white shadow-md">
                {u.initials}
              </div>
              <div className="text-[18px] font-black text-slate-900">{u.name}</div>
              <div className="mb-4 text-[13px] font-semibold text-brand-DEFAULT">{u.role}</div>
              <div className="space-y-2">
                {[
                  { icon: '🎓', label: u.faculty    },
                  { icon: '📚', label: u.year       },
                  { icon: '📅', label: `Üyelik: ${u.joinedAt}` },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[13px] text-slate-600">
                    <span aria-hidden="true">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[1.5px] text-slate-500">
              Sosyal
            </div>
            <div className="space-y-2.5">
              <a
                href={`https://${u.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 hover:text-brand-DEFAULT"
              >
                {/* GitHub icon */}
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.71c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.85.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.4c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/>
                </svg>
                {u.github}
              </a>
              <a
                href={`https://${u.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 hover:text-brand-DEFAULT"
              >
                {/* LinkedIn icon */}
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9H7.12v11.45Z"/>
                </svg>
                {u.linkedin}
              </a>
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="space-y-4">

          {/* Bio */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900">Hakkımda</h2>
              <button className="btn btn-ghost btn-sm">Düzenle</button>
            </div>
            <p className="text-[14px] leading-7 text-slate-600">{u.bio}</p>
          </div>

          {/* Interests */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-base font-extrabold text-slate-900">İlgi Alanları</h2>
            <div className="flex flex-wrap gap-2">
              {u.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-brand-DEFAULT/15 bg-brand-soft px-3.5 py-1.5 text-[13px] font-semibold text-brand-DEFAULT"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-base font-extrabold text-slate-900">Beceriler</h2>
            <div className="flex flex-wrap gap-2">
              {u.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-slate-100 px-3.5 py-1.5 text-[13px] font-semibold text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Account info */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900">Hesap Bilgileri</h2>
              <button className="btn btn-ghost btn-sm">Düzenle</button>
            </div>
            <dl className="space-y-3">
              {[
                { term: 'E-posta',        value: u.email    },
                { term: 'Üyelik Tarihi',  value: u.joinedAt },
                { term: 'Bölüm',          value: u.department },
              ].map(({ term, value }) => (
                <div key={term} className="flex justify-between text-[13px]">
                  <dt className="text-slate-500">{term}</dt>
                  <dd className="font-semibold text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </div>
    </div>
  );
}
