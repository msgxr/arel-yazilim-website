import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-dark px-6 text-center">
      {/* Background Glows */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-brand-DEFAULT/20 blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-vibrant/10 blur-[120px]" aria-hidden="true" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--brand) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-2 text-[120px] font-black leading-none tracking-tighter text-white opacity-20 transition-all hover:opacity-100 sm:text-[180px]">
          404
        </div>
        
        <h1 className="mb-4 text-3xl font-black text-white sm:text-5xl">
          Aradığın <span className="gradient-text">Kod</span> Bulunamadı
        </h1>
        
        <p className="mb-10 max-w-md text-lg font-medium text-slate-400">
          Görünüşe göre bu sayfa ya derleme hatası aldı ya da hiç var olmadı. Ana sayfaya dönüp tekrar deneyelim.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="btn btn-primary btn-lg"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/iletisim"
            className="btn btn-outline-white btn-lg"
          >
            Bize Bildir
          </Link>
        </div>
      </div>
      
      {/* Footer hint */}
      <div className="absolute bottom-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        AREL SOFTWARE CLUB · TECH ECOSYSTEM
      </div>
    </div>
  );
}
