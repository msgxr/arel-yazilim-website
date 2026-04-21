'use client';

import { useState, useMemo } from 'react';
import { useForm } from '@/hooks/use-form';
import { FormField, Input, Select, Textarea } from '@/components/ui/form-controls';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_MEMBERSHIP_ID || '__REPLACE__';
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

const DEPARTMENTS = [
  'Bilgisayar Mühendisliği',
  'Yazılım Mühendisliği',
  'Yönetim Bilişim Sistemleri',
  'Elektrik-Elektronik Mühendisliği',
  'Endüstri Mühendisliği',
  'Dijital Oyun Tasarımı',
  'Matematik-Bilgisayar',
  'Grafik Tasarım',
  'Diğer',
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

export default function MembershipForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const {
    values,
    errors,
    status,
    message,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setStatus,
  } = useForm({
    endpoint: ENDPOINT,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      studentId: '',
      department: '',
      year: '',
      interests: [] as string[],
      motivation: '',
      kvkk: false,
    },
    validate: validateMembership,
    onSuccess: () => setStatus('success'),
  });

  const canGoNext = useMemo(() => {
    if (step === 1) return values.name && values.email && values.phone;
    if (step === 2) return values.department && values.year;
    return true;
  }, [step, values]);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  if (status === 'success') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-green-100 bg-white p-12 text-center shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />
        <div className="relative">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
            ✓
          </div>
          <h2 className="mb-3 text-2xl font-black text-slate-900">Başvurunuz Alındı!</h2>
          <p className="mx-auto max-w-md leading-relaxed text-slate-500">
            Başvurunuz başarıyla kulüp yönetimimize iletildi. 
            En kısa sürede e-posta adresiniz üzerinden sizinle iletişime geçeceğiz.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              E-posta gönderildi
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      {/* Progress Bar */}
      <div className="flex h-1.5 bg-slate-100">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 transition-all duration-500 ${
              i <= step ? 'bg-blue-500' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-widest text-blue-600">
            Adım {step} / {totalSteps}
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">
            {step === 1 ? 'Kişisel Bilgiler' : step === 2 ? 'Akademik Bilgiler' : 'Son Adım'}
          </h2>
        </div>

        {/* Step 1: Personal */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="Ad Soyad" error={touched.name ? errors.name : undefined} required>
              <Input
                name="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                hasError={touched.name && !!errors.name}
                placeholder="Adınız Soyadınız"
              />
            </FormField>
            <FormField label="E-posta" error={touched.email ? errors.email : undefined} required>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                hasError={touched.email && !!errors.email}
                placeholder="ornek@ogr.istanbularel.edu.tr"
              />
            </FormField>
            <FormField label="Telefon" error={touched.phone ? errors.phone : undefined} required>
              <Input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                hasError={touched.phone && !!errors.phone}
                placeholder="05xx xxx xx xx"
              />
            </FormField>
          </div>
        )}

        {/* Step 2: Academic */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="Bölüm" error={touched.department ? errors.department : undefined} required>
              <Select
                name="department"
                value={values.department}
                onChange={(e) => handleChange('department', e.target.value)}
                onBlur={() => handleBlur('department')}
                hasError={touched.department && !!errors.department}
              >
                <option value="">Bölümünüzü seçin</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Sınıf" error={touched.year ? errors.year : undefined} required>
              <Select
                name="year"
                value={values.year}
                onChange={(e) => handleChange('year', e.target.value)}
                onBlur={() => handleBlur('year')}
                hasError={touched.year && !!errors.year}
              >
                <option value="">Sınıf seçin</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Öğrenci Numarası (Opsiyonel)">
              <Input
                name="studentId"
                value={values.studentId}
                onChange={(e) => handleChange('studentId', e.target.value)}
                placeholder="202X000XXX"
              />
            </FormField>
          </div>
        )}

        {/* Step 3: Motivation & Interests */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="İlgi Alanları" error={touched.interests ? errors.interests : undefined} required>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map(({ id, label, icon }) => {
                  const active = values.interests?.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        const next = active
                          ? values.interests?.filter((i) => i !== id)
                          : [...(values.interests || []), id];
                        handleChange('interests', next);
                      }}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[13px] font-semibold transition-all ${
                        active
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
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
                name="motivation"
                value={values.motivation}
                onChange={(e) => handleChange('motivation', e.target.value)}
                onBlur={() => handleBlur('motivation')}
                hasError={touched.motivation && !!errors.motivation}
                placeholder="Becerilerin, beklentilerin ve kulüpten beklentilerin..."
              />
            </FormField>

            <div
              className="flex cursor-pointer select-none items-start gap-3"
              onClick={() => handleChange('kvkk', !values.kvkk)}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                  values.kvkk ? 'border-blue-500 bg-blue-500' : 'border-slate-300 bg-white'
                }`}
              >
                {values.kvkk && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3 text-white">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-[12px] leading-relaxed text-slate-500">
                <a href="/gizlilik" className="font-bold text-slate-700 underline hover:text-blue-600">
                  KVKK Metni
                </a>
                'ni okudum ve verilerimin üyelik işlemleri için işlenmesini onaylıyorum.
              </span>
            </div>
            {touched.kvkk && errors.kvkk && <p className="text-[12px] font-bold text-red-500">{errors.kvkk}</p>}
          </div>
        )}

        {/* Status Message */}
        {message && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-[13px] font-medium text-red-600">
            ⚠️ {message}
          </div>
        )}

        {/* Footer */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="rounded-xl border border-slate-200 px-6 py-3.5 text-[14px] font-bold text-slate-700 transition-all hover:bg-slate-50"
            >
              Geri
            </button>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canGoNext}
              className="flex-1 rounded-xl bg-blue-500 px-8 py-3.5 text-[14px] font-bold text-white transition-all hover:bg-blue-600 disabled:opacity-50 disabled:grayscale"
            >
              Devam Et →
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-1 rounded-xl bg-blue-500 px-8 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 disabled:opacity-50"
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Başvurumu Tamamla'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}