import type { Metadata } from 'next';
import Link from 'next/link';
import { events } from '@/content/events';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = { title: 'Etkinliklerim | Üye Paneli' };

/* ── Mock: user's registered events ──────────────────────────── */
const REGISTERED_IDS = ['evt-001', 'evt-002', 'evt-006', 'evt-007', 'evt-008'];
const ATTENDED_IDS   = ['evt-006', 'evt-007', 'evt-008'];

/* ─────────────────────────────────────────────────────────────── */
export default function EtkinliklerimPage() {
  const myUpcoming = events.filter(
    (e) => REGISTERED_IDS.includes(e.id) && (e.status === 'upcoming' || e.status === 'ongoing'),
  );
  const myPast = events.filter(
    (e) => REGISTERED_IDS.includes(e.id) && e.status === 'past',
  );

  const STATS = [
    { label: 'Toplam Kayıt', value: REGISTERED_IDS.length, icon: '📋', textColor: 'text-brand-DEFAULT' },
    { label: 'Katıldım',     value: ATTENDED_IDS.length,   icon: '✅', textColor: 'text-green-700'     },
    { label: 'Yaklaşan',     value: myUpcoming.length,      icon: '⏳', textColor: 'text-purple-600'    },
  ] as const;

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-1.5 text-2xl font-black tracking-tight text-slate-900">
            Etkinliklerim
          </h1>
          <p className="text-sm text-slate-500">Kayıt olduğun ve katıldığın etkinlikler.</p>
        </div>
        <Link href="/etkinlikler" className="btn btn-primary btn-sm shrink-0">
          Yeni Etkinlik Bul
        </Link>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map(({ label, value, icon, textColor }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-2 text-[22px]" aria-hidden="true">{icon}</div>
            <div className={`text-[28px] font-black leading-none ${textColor}`}>{value}</div>
            <div className="mt-1 text-[12px] text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Upcoming ── */}
      {myUpcoming.length > 0 && (
        <section aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="mb-4 text-[18px] font-extrabold text-slate-900">
            📅 Yaklaşan Etkinlikler
          </h2>
          <div className="space-y-3">
            {myUpcoming.map((event) => (
              <Link
                key={event.id}
                href={`/etkinlikler/${event.slug}`}
                className="card flex items-center gap-4 rounded-xl border-l-4 border-l-brand-DEFAULT px-6 py-4 no-underline"
              >
                {/* Date chip */}
                <div className="flex shrink-0 min-w-[52px] flex-col items-center rounded-lg bg-brand-soft px-2 py-1.5 text-center">
                  <span className="text-[11px] font-extrabold uppercase text-brand-DEFAULT leading-none">
                    {new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' })}
                  </span>
                  <span className="text-[22px] font-black leading-none text-brand-DEFAULT">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                {/* Meta */}
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-extrabold text-slate-900">{event.title}</div>
                  <div className="mt-1 text-[13px] text-slate-500">
                    {event.type} · {event.location}
                  </div>
                </div>
                {/* Status badge */}
                <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-700">
                  Kayıtlısın
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Past ── */}
      {myPast.length > 0 && (
        <section aria-labelledby="past-heading">
          <h2 id="past-heading" className="mb-4 text-[18px] font-extrabold text-slate-900">
            🗂️ Geçmiş Etkinlikler
          </h2>
          <div className="space-y-2.5">
            {myPast.map((event) => {
              const attended = ATTENDED_IDS.includes(event.id);
              return (
                <Link
                  key={event.id}
                  href={`/etkinlikler/${event.slug}`}
                  className="card flex items-center gap-4 rounded-xl px-5 py-3.5 opacity-80 no-underline hover:opacity-100"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-slate-900">{event.title}</div>
                    <div className="mt-0.5 text-[12px] text-slate-500">
                      {formatDate(event.date)} · {event.type}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      attended
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {attended ? '✓ Katıldım' : 'Katılmadım'}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
