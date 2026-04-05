import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: `${siteConfig.name} gizlilik politikası, KVKK aydınlatma metni ve kullanım koşulları.`,
  alternates: { canonical: '/gizlilik' },
};

export default function GizlilikPage() {
  const sections = [
    {
      id: 'kvkk',
      title: 'KVKK — Kişisel Verilerin Korunması',
      content: `6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki veri sorumlusunuz. Toplanan veriler; iletişim formundan gönderilen ad-soyad, e-posta ve mesaj metinleridir. Bu veriler yalnızca iletişim talebinizin karşılanması amacıyla kullanılmakta olup üçüncü şahıslarla paylaşılmamaktadır. Veriler, talebinizin karşılanmasının ardından 6 ay içinde silinmektedir.`,
    },
    {
      id: 'kullanim',
      title: 'Kullanım Koşulları',
      content: `Bu web sitesi, Arel Yazılım Kulübü tarafından bilgi amaçlı yayınlanmaktadır. Sitede yer alan içerikler telif hakkı kapsamında koruma altındadır. İçeriklerin kaynak gösterilerek paylaşılması serbesttir. Kulüp, sitede yer alan bilgilerin doğruluğunu taahhüt etmemekle birlikte güncel tutmak için azami özeni göstermektedir.`,
    },
    {
      id: 'cerez',
      title: 'Çerez Politikası',
      content: `Bu web sitesi, oturum çerezleri dışında herhangi bir izleme çerezi kullanmamaktadır. Performans analitiği için Plausible Analytics kullanılmakta olup bu hizmet kişisel veri toplamaz. Reklam çerezi bulunmamaktadır. Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz.`,
    },
    {
      id: 'iletisim',
      title: 'Gizlilik İletişim',
      content: `Kişisel verilerinize ilişkin haklarınızı kullanmak, veri erişim talebi veya silme talebi için e-posta adresimizden bize ulaşabilirsiniz.`,
    },
  ];

  return (
    <Section aria-labelledby="gizlilik-heading">
      <div className="container-site">
        <SectionHeader
          label="Politika"
          title={<>Gizlilik & <span className="text-brand-DEFAULT">KVKK</span></>}
          description={`Son güncelleme: Mart ${new Date().getFullYear()}`}
          id="gizlilik-heading"
        />
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-slate max-w-none">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="mb-10">
                <h2 className="mb-4 text-xl font-extrabold text-slate-800">{s.title}</h2>
                <p className="text-base leading-[1.8] text-slate-600">{s.content}</p>
                {s.id === 'iletisim' && (
                  <a
                    href={`mailto:${siteConfig.email}?subject=Gizlilik Talebi`}
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-DEFAULT px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-vibrant"
                  >
                    E-posta Gönder
                  </a>
                )}
                <hr className="mt-8 border-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
