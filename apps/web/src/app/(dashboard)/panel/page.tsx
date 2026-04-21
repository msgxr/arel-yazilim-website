import type { Metadata } from 'next';
import Link from 'next/link';
import { events } from '@/content/events';
import { projects } from '@/content/projects';
import { MOCK_USER } from '@/lib/mock-user';

export const metadata: Metadata = {
  title: 'Üye Paneli | Arel Yazılım Kulübü',
  description: 'Arel Yazılım Kulübü üye paneli — etkinlikler, projeler ve profil yönetimi.',
};

/* ── Static stat config ──────────────────────────────────────── */
const STATS = [
  { label: 'Katıldığım Etkinlik', value: '7',    icon: '📅', dot: 'bg-brand-DEFAULT' },
  { label: 'Aktif Proje',         value: '2',    icon: '🚀', dot: 'bg-purple-500'    },
  { label: 'Üyelik Süresi',       value: '6 ay', icon: '🏅', dot: 'bg-green-700'     },
  { label: 'Puan',                value: '240',  icon: '⭐', dot: 'bg-yellow-500'    },
] as const;

/* ── Page component ─────────────────────────────────────────── */
export default function DashboardPage() {
  const upcomingEvents  = events  .filter((e) => e.status === 'upcoming').slice(0, 3);
  const activeProjects  = projects.filter((p) => p.status === 'active' || p.status === 'development').slice(0, 3);

  return (
    <div className="space-y-8">

      {/* ── Welcome ── */}
      <div>
        <h1 className="mb-1.5 text-[28px] font-black tracking-tight text-slate-900">
          Merhaba, {MOCK_USER.name} 👋
        </h1>
        <p className="text-sm text-slate-500">
          Bu hafta 1 etkinliğin var. Aktif projelerini takip et.
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map(({ label, value, icon, dot }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[22px]" aria-hidden="true">{icon}</span>
              <span className={`h-2 w-2 rounded-full ${dot}`} />
            </div>
            <div className="text-[28px] font-black leading-none text-slate-900">{value}</div>
            <div className="mt-1 text-[12px] text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Two-column content ── */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Upcoming events */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-extrabold text-slate-900">📅 Yaklaşan Etkinlikler</h2>
            <Link
              href="/etkinlikler"
              className="text-[12px] font-bold text-brand-DEFAULT hover:underline"
            >
              Tümü →
            </Link>
          </div>
          <div className="p-2">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/etkinlikler/${event.slug}`}
                className="card flex items-center gap-3.5 rounded-lg p-3 no-underline"
              >
                {/* Date chip */}
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-soft text-brand-DEFAULT">
                  <span className="text-[10px] font-bold leading-none">
                    {new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase()}
                  </span>
                  <span className="text-[16px] font-black leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                {/* Meta */}
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-bold text-slate-900">{event.title}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">
                    {event.type} · {(event.location.split('·')[0] ?? event.location).trim()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Active projects */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-extrabold text-slate-900">🚀 Aktif Projeler</h2>
            <Link
              href="/projeler"
              className="text-[12px] font-bold text-brand-DEFAULT hover:underline"
            >
              Tümü →
            </Link>
          </div>
          <div className="p-2">
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projeler/${project.slug}`}
                className="card block rounded-lg px-4 py-3 no-underline"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-900">{project.title}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      project.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {project.status === 'active' ? 'Aktif' : 'Geliştiriliyor'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="rounded-xl border border-brand-DEFAULT/10 bg-brand-soft p-6">
        <div className="mb-4 text-[15px] font-extrabold text-slate-900">⚡ Hızlı İşlemler</div>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/etkinlikler"  className="btn btn-primary btn-sm">Etkinliklere Göz At</Link>
          <Link href="/projeler"     className="btn btn-ghost   btn-sm">Projeleri İncele</Link>
          <Link href="/topluluk"     className="btn btn-ghost   btn-sm">Alt Topluluklara Katıl</Link>
          <Link href="/panel/profilim" className="btn btn-ghost btn-sm">Profili Düzenle</Link>
        </div>
      </div>

    </div>
  );
}
