import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-premium)] px-6 text-center">
      <div className="mb-6 text-[80px] font-black text-brand-DEFAULT opacity-30">404</div>
      <h1 className="mb-4 text-4xl font-extrabold text-slate-800">Sayfa Bulunamadı</h1>
      <p className="mb-10 max-w-md text-slate-500">
        Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-md bg-brand-DEFAULT px-8 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-vibrant hover:shadow-brand-lg"
        >
          Ana Sayfaya Git
        </Link>
        <Link
          href="/iletisim"
          className="rounded-md border border-slate-200 px-8 py-3.5 font-bold text-slate-800 transition-all hover:border-brand-DEFAULT"
        >
          Bize Ulaşın
        </Link>
      </div>
    </div>
  );
}
