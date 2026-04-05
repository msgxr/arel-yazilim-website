import type { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/ui/Section';
import { managementTeam, departments } from '@/content/team';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Yönetim Ekibi',
  description: `${siteConfig.name} yönetim kurulu ve departman ekipleri. Öğrenci liderler ve teknik kadro.`,
  alternates: { canonical: '/ekip' },
};

export default function EkipPage() {
  return (
    <>
      <Section aria-labelledby="yonetim-heading">
        <div className="container-site">
          <SectionHeader
            label="Kadro"
            title={<>Yönetim <span className="text-brand-DEFAULT">Kurulu</span></>}
            description={`${siteConfig.academicYear} döneminde kulübümüzü yöneten liderler.`}
            id="yonetim-heading"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {managementTeam.map((member) => (
              <div
                key={member.id}
                className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-DEFAULT hover:shadow-lg"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-DEFAULT to-brand-vibrant text-2xl font-extrabold text-white shadow-brand-lg">
                  {member.initials}
                </div>
                <div className="mb-1 text-lg font-extrabold text-slate-800">{member.name}</div>
                <div className="mb-1 text-sm font-bold text-brand-DEFAULT">{member.role}</div>
                <div className="mb-4 text-xs text-slate-400">
                  {member.faculty} · {member.year}
                </div>
                <div className="flex gap-2">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[11px] font-bold text-slate-500 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                      aria-label={`${member.name} LinkedIn (yeni sekmede)`}>in</a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[11px] font-bold text-slate-500 transition-all hover:border-slate-800 hover:bg-slate-800 hover:text-white"
                      aria-label={`${member.name} GitHub (yeni sekmede)`}>GH</a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[11px] text-slate-500 transition-all hover:border-brand-DEFAULT hover:bg-brand-soft hover:text-brand-DEFAULT"
                      aria-label={`${member.name} e-posta`}>✉</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="alt" aria-labelledby="departmanlar-heading">
        <div className="container-site">
          <SectionHeader
            label="Departmanlar"
            title={<>Kulüp <span className="text-brand-DEFAULT">Yapılanması</span></>}
            id="departmanlar-heading"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept) => (
              <div key={dept.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-extrabold text-slate-800">{dept.name}</h3>
                {dept.members.length > 0 ? (
                  <ul className="flex flex-col gap-3" role="list">
                    {dept.members.map((m) => (
                      <li key={m.id} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-DEFAULT">
                          {m.initials}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-700">{m.name}</div>
                          <div className="text-xs text-slate-400">{m.role}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400">Yakında güncelleniyor.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
