import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Ayarlar | Üye Paneli' };

/* ── Notification settings config ───────────────────────────── */
const NOTIFICATIONS = [
  { label: 'Etkinlik Bildirimleri',  desc: 'Yeni etkinlikler ve hatırlatıcılar',              on: true  },
  { label: 'Duyurular',              desc: 'Kulüp duyuruları ve haberler',                    on: true  },
  { label: 'Proje Güncellemeleri',   desc: 'Üye olduğunuz projelerde yeni aktivite',          on: false },
  { label: 'Blog Bildirimleri',      desc: 'Yeni teknik yazılar yayınlandığında',             on: false },
] as const;

const PRIVACY = [
  { label: 'Profili Herkese Açık Yap',     desc: 'Profil sayfanız kulüp üyelerine görünür',  on: true  },
  { label: 'GitHub İstatistiklerini Göster', desc: 'Katkıda bulunduğunuz projeler listede görünür', on: true },
] as const;

/* ── Presentational toggle (static — will be interactive with auth) ── */
function Toggle({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
        on ? 'bg-brand-DEFAULT' : 'bg-slate-200'
      }`}
    >
      <div
        className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
          on ? 'left-[22px]' : 'left-[2px]'
        }`}
      />
    </div>
  );
}

/* ── Settings section card ── */
function SettingsCard({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; desc: string; on: boolean }>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map(({ label, desc, on }) => (
          <div key={label} className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="text-[14px] font-bold text-slate-900">{label}</div>
              <div className="mt-0.5 text-[12px] text-slate-500">{desc}</div>
            </div>
            <Toggle on={on} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
export default function AyarlarPage() {
  return (
    <div className="space-y-6">

      {/* ── Page title ── */}
      <div>
        <h1 className="mb-1.5 text-2xl font-black tracking-tight text-slate-900">Ayarlar</h1>
        <p className="text-sm text-slate-500">Hesap tercihlerini ve bildirim ayarlarını yönet.</p>
      </div>

      {/* ── Notification preferences ── */}
      <SettingsCard title="🔔 Bildirimler" items={NOTIFICATIONS} />

      {/* ── Privacy ── */}
      <SettingsCard title="🔒 Gizlilik" items={PRIVACY} />

      {/* ── Danger zone ── */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="mb-1.5 text-base font-extrabold text-red-600">⚠️ Tehlikeli Alan</h2>
        <p className="mb-5 text-[13px] leading-relaxed text-slate-500">
          Hesabınızı silmek geri alınamaz. Tüm verileriniz kalıcı olarak silinir.
        </p>
        <button
          type="button"
          className="rounded-lg border border-red-400 bg-transparent px-5 py-2.5 text-[13px] font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
        >
          Hesabı Sil
        </button>
      </div>

    </div>
  );
}
