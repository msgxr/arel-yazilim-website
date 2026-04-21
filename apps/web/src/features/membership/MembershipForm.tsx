'use client';

import { useState, useMemo } from 'react';
import { useForm } from '@/hooks/use-form';
import { FormField, Input, Select, Textarea } from '@/components/ui/form-controls';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_MEMBERSHIP_ID || '__REPLACE__';
const ENDPOINT     = `https://formspree.io/f/${FORMSPREE_ID}`;

/* ── Constants ── */
const DEPARTMENTS = [
  'Bilgisayar Mühendisliği', 'Yazılım Mühendisliği', 'Yönetim Bilişim Sistemleri',
  'Elektrik-Elektronik Mühendisliği', 'Endüstri Mühendisliği', 'Dijital Oyun Tasarımı',
  'Matematik-Bilgisayar', 'Grafik Tasarım', 'Diğer'
] as const;

const YEARS = ['Hazırlık', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', 'Mezun'] as const;

const INTERESTS = [
  { id: 'web', label: 'Web Geliştirme', icon: '🌐' },
  { id: 'ai', label: 'Yapay Zeka / ML', icon: '🤖' },
  { id: 'mobile', label: 'Mobil Uygulama', icon: '📱' },
  { id: 'cyber', label: 'Siber Güvenlik', icon: '🛡️' },
  { id: 'design', label: 'UI/UX Tasarım', icon: '🎨' },
  { id: 'game', label: 'Oyun Geliştirme', icon: '🎮' },
] as const;

interface MembershipValues {
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  year?: string;
  interests?: string[];
  motivation?: string;
  kvkk?: boolean;
}

/* ── Validation ── */
const validateMembership = (values: MembershipValues) => {
  const errors: Record<string, string> = {};
  
  if (!values.name?.trim()) errors.name = 'Ad Soyad gereklidir.';
  if (!values.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Geçerli bir e-posta adresi girin.';
  }
  if (!values.phone?.trim()) errors.phone = 'Telefon numarası gereklidir.';
  if (!values.department) errors.department = 'Bölüm seçimi gereklidir.';
  if (!values.year) errors.year = 'Sınıf seçimi gereklidir.';
  if (!values.interests?.length) errors.interests = 'En az bir ilgi alanı seçin.';
  if (!values.motivation?.trim() || values.motivation.length < 20) {
    errors.motivation = 'Lütfen en az 20 karakterlik bir motivasyon yazısı girin.';
  }
  if (!values.kvkk) errors.kvkk = 'KVKK metnini onaylamanız gerekmektedir.';

  return errors;
};

/* ─────────────────────────────────────────────────────────────── */
export default function MembershipForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const {
    values, errors, status, message, touched,
    handleChange, handleBlur, handleSubmit, setStatus
  } = useForm({
    endpoint: ENDPOINT,
    initialValues: {
      name: '', email: '', phone: '', studentId: '',
      department: '', year: '', interests: [] as string[],
      motivation: '', kvkk: false
    },
    validate: validateMembership,
    onSuccess: () => setStatus('success')
  });

  const canGoNext = useMemo(() => {
    if (step === 1) return values.name && values.email && values.phone;
    if (step === 2) return values.department && values.year;
    return true;
  }, [step, values]);

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (status === 'success') {
    return (
      <div className="text-center p-12 bg-white rounded-2xl border border-green-100 shadow-xl">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✓
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-3">Başvurunuz Alındı!</h2>
        <p className="text-slate-500 leading-relaxed max-w-md mx-auto">
          Başvurunuz başarıyla kulüp yönetimimize iletildi. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* ── Progress Bar ── */}
      <div className="h-1.5 bg-slate-100 flex">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 transition-all duration-500 ${
              i <= step ? 'bg-brand-DEFAULT' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-black uppercase tracking-widest text-brand-DEFAULT">
            Adım {step} / {totalSteps}
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">
            {step === 1 ? 'Kişisel Bilgiler' : step === 2 ? 'Akademik Bilgiler' : 'Son Adım'}
          </h2>
        </div>

        {/* ── Step 1: Personal ── */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="Ad Soyad" error={touched.name ? errors.name : undefined} required>
              <Input
                name="name" value={values.name} 
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                hasError={touched.name && !!errors.name}
                placeholder="Adınız Soyadınız"
              />
            </FormField>
            <FormField label="E-posta" error={touched.email ? errors.email : undefined} required>
              <Input
                type="email" name="email" value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                hasError={touched.email && !!errors.email}
                placeholder="ornek@domain.com"
              />
            </FormField>
            <FormField label="Telefon" error={touched.phone ? errors.phone : undefined} required>
              <Input
                type="tel" name="phone" value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                hasError={touched.phone && !!errors.phone}
                placeholder="05xx xxx xx xx"
              />
            </FormField>
          </div>
        )}

        {/* ── Step 2: Academic ── */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="Bölüm" error={touched.department ? errors.department : undefined} required>
              <Select
                name="department" value={values.department}
                onChange={(e) => handleChange('department', e.target.value)}
                onBlur={() => handleBlur('department')}
                hasError={touched.department && !!errors.department}
              >
                <option value="">Bölümünüzü seçin</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </Select>
            </FormField>
            <FormField label="Sınıf" error={touched.year ? errors.year : undefined} required>
              <Select
                name="year" value={values.year}
                onChange={(e) => handleChange('year', e.target.value)}
                onBlur={() => handleBlur('year')}
                hasError={touched.year && !!errors.year}
              >
                <option value="">Sınıf seçin</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </Select>
            </FormField>
            <FormField label="Öğrenci Numarası (Opsiyonel)">
              <Input
                name="studentId" value={values.studentId}
                onChange={(e) => handleChange('studentId', e.target.value)}
                placeholder="202X000XXX"
              />
            </FormField>
          </div>
        )}

        {/* ── Step 3: Motivation & Interests ── */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="İlgi Alanları" error={touched.interests ? errors.interests : undefined} required>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map(({ id, label, icon }) => {
                  const active = values.interests.includes(id);
                  return (
                    <button
                      key={id} type="button"
                      onClick={() => {
                        const next = active ? values.interests.filter(i => i !== id) : [...values.interests, id];
                        handleChange('interests', next);
                      }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-[13px] font-semibold transition-all ${
                        active ? 'bg-brand-soft border-brand-DEFAULT text-brand-DEFAULT' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span>{icon}</span> {label}
                    </button>
                  );
                })}
              </div>
            </FormField>

            <FormField label="Neden Katılmak İstiyorsun?" error={touched.motivation ? errors.motivation : undefined} required>
              <Textarea
                name="motivation" value={values.motivation}
                onChange={(e) => handleChange('motivation', e.target.value)}
                onBlur={() => handleBlur('motivation')}
                hasError={touched.motivation && !!errors.motivation}
                placeholder="Becerilerin, beklentilerin ve motivasyonun..."
              />
            </FormField>

            <div className="flex items-start gap-3 select-none cursor-pointer" onClick={() => handleChange('kvkk', !values.kvkk)}>
              <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${values.kvkk ? 'bg-brand-DEFAULT border-brand-DEFAULT' : 'bg-white border-slate-300'}`}>
                {values.kvkk && <span className="text-white text-[10px] font-bold">✓</span>}
              </div>
              <span className="text-[12px] text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-700 underline">KVKK Metni</span>&apos;ni okudum ve verilerimin kulüp üyelik işlemleri için saklanmasını onaylıyorum.
              </span>
            </div>
            {touched.kvkk && errors.kvkk && <p className="text-[12px] font-bold text-red-500">{errors.kvkk}</p>}
          </div>
        )}

        {/* ── Status Message ── */}
        {message && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[13px] text-red-600 font-medium">
            ⚠️ {message}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <button
              type="button" onClick={prevStep}
              className="px-6 py-3.5 rounded-xl border border-slate-200 text-[14px] font-bold text-slate-700 hover:bg-slate-50 transition-all"
            >
              Geri
            </button>
          )}
          
          {step < totalSteps ? (
            <button
              type="button" onClick={nextStep} disabled={!canGoNext}
              className="flex-1 bg-brand-DEFAULT hover:bg-brand-vibrant text-white px-8 py-3.5 rounded-xl text-[14px] font-bold transition-all disabled:opacity-50 disabled:grayscale"
            >
              Devam Et →
            </button>
          ) : (
            <button
              type="submit" disabled={status === 'loading'}
              className="flex-1 bg-brand-DEFAULT hover:bg-brand-vibrant text-white px-8 py-3.5 rounded-xl text-[14px] font-bold shadow-lg shadow-brand-DEFAULT/20 transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Başvurumu Tamamla'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
