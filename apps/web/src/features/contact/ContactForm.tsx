'use client';

import { useForm } from '@/hooks/use-form';
import { FormField, Input, Select, Textarea } from '@/components/ui/form-controls';
import { siteConfig } from '@/content/site';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID || '__REPLACE__';
const ENDPOINT     = `https://formspree.io/f/${FORMSPREE_ID}`;

const SUBJECTS = [
  'Üyelik Bilgisi',
  'Etkinlik Sorusu',
  'Kurumsal İş Birliği',
  'Teknik Soru',
  'Diğer',
] as const;

const validateContact = (values: { name?: string; email?: string; message?: string }) => {
  const errors: Record<string, string> = {};
  if (!values.name?.trim()) errors.name = 'Ad Soyad gereklidir.';
  if (!values.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Geçerli bir e-posta adresi girin.';
  }
  if (!values.message?.trim() || values.message.length < 10) {
    errors.message = 'Mesaj en az 10 karakter olmalıdır.';
  }
  return errors;
};

export default function ContactForm() {
  const {
    values, errors, status, message, touched,
    handleChange, handleBlur, handleSubmit
  } = useForm({
    endpoint: ENDPOINT,
    initialValues: { name: '', email: '', subject: '', message: '' },
    validate: validateContact
  });

  if (status === 'success') {
    return (
      <div className="text-center p-12 bg-white rounded-2xl border border-green-100 shadow-xl">
        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          ✓
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">Mesajınız İletildi!</h2>
        <p className="text-slate-500 text-sm">En kısa sürede e-posta adresiniz üzerinden size dönüş yapacağız.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 text-brand-DEFAULT font-bold text-sm hover:underline"
        >
          Yeni bir mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-5">
      <h2 className="text-xl font-black text-slate-900 mb-2">Bize İletin</h2>
      
      <div className="grid gap-5 sm:grid-cols-2">
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
            placeholder="iletisim@domain.com"
          />
        </FormField>
      </div>

      <FormField label="Konu">
        <Select
          name="subject" value={values.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
        >
          <option value="">Bir konu seçin (opsiyonel)</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </FormField>

      <FormField label="Mesajınız" error={touched.message ? errors.message : undefined} required>
        <Textarea
          name="message" value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          hasError={touched.message && !!errors.message}
          placeholder="Size nasıl yardımcı olabiliriz?"
        />
      </FormField>

      {message && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
          ❌ {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-brand-DEFAULT hover:bg-brand-vibrant text-white px-8 py-4 rounded-xl font-black text-[15px] shadow-lg shadow-brand-DEFAULT/20 transition-all disabled:opacity-50"
      >
        {status === 'loading' ? 'Gönderiliyor...' : 'Mesajı Gönder →'}
      </button>

      <p className="text-center text-[12px] text-slate-400">
        Veya doğrudan yazın:{' '}
        <a href={`mailto:${siteConfig.email}`} className="font-bold text-brand-DEFAULT hover:underline">
          {siteConfig.email}
        </a>
      </p>
    </form>
  );
}
