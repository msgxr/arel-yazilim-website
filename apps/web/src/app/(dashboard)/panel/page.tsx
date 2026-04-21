import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Üye Paneli | Arel Yazılım Kulübü',
  description: 'Kişisel dashboard ve etkinlik takibi.',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Yükleniyor...</p>
      </div>
    );
  }

  // Fetch real data
  const [
    userApplications,
    userAttendances,
    upcomingEvents,
    userTasks,
  ] = await Promise.all([
    prisma.application.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.attendance.findMany({
      where: { userId: session.user.id },
      include: { event: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.event.findMany({
      where: { date: { gte: new Date() }, status: { in: ['PUBLISHED', 'REGISTRATION_OPEN'] } },
      orderBy: { date: 'asc' },
      take: 5,
    }),
    prisma.task.findMany({
      where: { userId: session.user.id, status: { not: 'DONE' } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  const stats = [
    { label: 'Etkinlik', value: userAttendances.length, icon: '📅', color: 'bg-blue-50 text-blue-600' },
    { label: 'Başvuru', value: userApplications.length, icon: '📋', color: 'bg-purple-50 text-purple-600' },
    { label: 'Görev', value: userTasks.length, icon: '✅', color: 'bg-green-50 text-green-600' },
    { label: 'Puan', value: userTasks.filter((t: { status: string; points: number }) => t.status === 'DONE').reduce((acc: number, t: { status: string; points: number }) => acc + t.points, 0), icon: '⭐', color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="mb-1.5 text-[28px] font-black tracking-tight text-slate-900">
          Merhaba, {session.user.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-slate-500">
          {userAttendances.length > 0 
            ? `${userAttendances.length} etkinliğe katıldın. Aktif görevlerini takip et.`
            : 'Henüz etkinliğe katılmadın. Başlamak için etkinliklere göz at!'
          }
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              <span className="text-xl">{icon}</span>
            </div>
            <div className="text-[28px] font-black leading-none text-slate-900">{value}</div>
            <div className="mt-1 text-[12px] text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Events */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-extrabold text-slate-900">📅 Yaklaşan Etkinlikler</h2>
            <Link href="/etkinlikler" className="text-[12px] font-bold text-blue-600 hover:underline">
              Tümü →
            </Link>
          </div>
          <div className="p-2">
            {upcomingEvents.length === 0 ? (
              <div className="py-8 text-center">
                <span className="text-4xl mb-2 block">📭</span>
                <p className="text-sm text-slate-500">Henüz etkinlik yok</p>
                <Link href="/etkinlikler" className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:underline">
                  Etkinliklere göz at
                </Link>
              </div>
            ) : (
              upcomingEvents.map((event: { id: string; slug: string; date: Date; title: string; type: string; location: string }) => (
                <Link
                  key={event.id}
                  href={`/etkinlikler/${event.slug}`}
                  className="flex items-center gap-3.5 rounded-lg p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <span className="text-[10px] font-bold leading-none">
                      {new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase()}
                    </span>
                    <span className="text-[16px] font-black leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-bold text-slate-900">{event.title}</div>
                    <div className="mt-0.5 truncate text-[11px] text-slate-500">
                      {event.type} · {event.location.split('·')[0]?.trim()}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* My Tasks */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-extrabold text-slate-900">✅ Görevlerim</h2>
          </div>
          <div className="p-2">
            {userTasks.length === 0 ? (
              <div className="py-8 text-center">
                <span className="text-4xl mb-2 block">🎉</span>
                <p className="text-sm text-slate-500">Aktif görevin yok!</p>
              </div>
            ) : (
              userTasks.map((task: { id: string; status: string; title: string; points: number }) => (
                <div key={task.id} className="flex items-center gap-3 rounded-lg p-3">
                  <div className={`h-5 w-5 shrink-0 rounded-full border-2 ${task.status === 'DONE' ? 'border-green-500 bg-green-500' : 'border-slate-300'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-slate-700">{task.title}</div>
                    <div className="mt-0.5 text-[11px] text-slate-400">+{task.points} puan</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* My Applications */}
      {userApplications.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-extrabold text-slate-900">📋 Başvurularım</h2>
          </div>
          <div className="p-2">
            {userApplications.map((app: { id: string; fullName: string; createdAt: Date; status: string }) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg p-3 border-b border-slate-100 last:border-0">
                <div>
                  <div className="text-[13px] font-medium text-slate-700">{app.fullName}</div>
                  <div className="mt-0.5 text-[11px] text-slate-400">
                    {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                  app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                  app.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {app.status === 'APPROVED' ? 'Onaylandı' :
                   app.status === 'REJECTED' ? 'Reddedildi' :
                   app.status === 'UNDER_REVIEW' ? 'İnceleniyor' :
                   'Beklemede'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6">
        <div className="mb-4 text-[15px] font-extrabold text-slate-900">⚡ Hızlı İşlemler</div>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/etkinlikler" className="btn btn-primary btn-sm">Etkinliklere Göz At</Link>
          <Link href="/projeler" className="btn btn-ghost btn-sm">Projeleri İncele</Link>
          <Link href="/panel/profil" className="btn btn-ghost btn-sm">Profili Düzenle</Link>
          <Link href="/iletisim" className="btn btn-ghost btn-sm">İletişim</Link>
        </div>
      </div>
    </div>
  );
}