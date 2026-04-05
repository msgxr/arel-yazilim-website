import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: `${siteConfig.name} hakkında — misyon, vizyon, tarihçe ve değerler. ${siteConfig.university} resmi yazılım kulübü.`,
  alternates: { canonical: '/hakkimizda' },
};

const values = [
  { icon: '🔍', title: 'Merak & Keşif', desc: 'Öğrenmeyi asla durdurmayan, sorgulamayı severi bireyleri destekliyoruz.' },
  { icon: '🤝', title: 'İş Birliği', desc: 'Birlikte daha güçlü olduğumuza inanıyor, ortak başarıyı bireysel başarıdan önde tutuyoruz.' },
  { icon: '🚀', title: 'Gerçek Üretim', desc: 'Teoriden pratiğe: gerçek projeler, gerçek kod, gerçek deneyim.' },
  { icon: '🌍', title: 'Açık Kaynak', desc: 'Bilginin paylaşıldıkça büyüdüğüne inanıyor, açık kaynak kültürünü yaşatıyoruz.' },
  { icon: '💡', title: 'Yaratıcılık', desc: 'Standart çözümlerin ötesine geçme cesaretine sahibiz.' },
  { icon: '📈', title: 'Sürekli Gelişim', desc: 'Bugün dünden, yarın bugünden daha iyi olmak için çalışıyoruz.' },
];

export default function HakkimizdaPage() {
  return (
    <>
      <Section aria-labelledby="hakkimizda-heading">
        <div className="container-site">
          <SectionHeader
            label="Kimiz?"
            title={<>Arel <span className="text-brand-DEFAULT">Yazılım Kulübü</span></>}
            id="hakkimizda-heading"
          />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 text-lg leading-[1.8] text-slate-600">
                {siteConfig.name}, {siteConfig.university} bünyesinde {siteConfig.foundedYear} yılında kurulan ve
                {` ${siteConfig.office}`} ekosisteminde faaliyet gösteren resmî öğrenci yazılım kulübüdür.
              </p>
              <p className="mb-6 text-base leading-[1.8] text-slate-500">
                Yapay zekâ, yazılım geliştirme, veri bilimi ve donanım teknolojileri alanlarında projeler
                yürütüyor; workshop, seminer, panel ve hackathon etkinlikleri düzenliyoruz.
              </p>
              <p className="text-base leading-[1.8] text-slate-500">
                Kulübümüz; teknik becerilerin geliştirilmesinin yanı sıra liderlik, takım çalışması
                ve kariyer hazırlığı konularında da üyelerine kapsamlı destek sunar.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: '🎯', label: 'Misyon', text: 'Gelişen teknoloji ekosisteminde öğrencilerin üretken, meraklı ve donanımlı bireyler olarak yer almasını sağlamak.' },
                { icon: '🌟', label: 'Vizyon', text: 'Türkiye\'nin en etkin ve tanınan öğrenci yazılım topluluklarından biri olmak.' },
                { icon: '📅', label: 'Kuruluş', text: `${siteConfig.foundedYear} yılında kuruldu. ${siteConfig.academicYear} itibarıyla ${siteConfig.stats.members}+ aktif üye.` },
                { icon: '🏛️', label: 'Statü', text: `${siteConfig.university} ${siteConfig.office} onaylı resmî kulüp.` },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-2 text-2xl" aria-hidden="true">{item.icon}</div>
                  <div className="mb-1 text-sm font-bold uppercase tracking-wider text-brand-DEFAULT">{item.label}</div>
                  <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section variant="alt" aria-labelledby="degerler-heading">
        <div className="container-site">
          <SectionHeader
            label="Değerlerimiz"
            title={<>Bizi <span className="text-brand-DEFAULT">Şekillendiren</span> İlkeler</>}
            id="degerler-heading"
            center
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="mt-0.5 shrink-0 text-2xl" aria-hidden="true">{v.icon}</span>
                <div>
                  <div className="mb-1 font-bold text-slate-800">{v.title}</div>
                  <p className="text-sm leading-relaxed text-slate-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
