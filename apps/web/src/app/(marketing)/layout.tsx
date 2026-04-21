import UniversityBar from '@/components/layout/UniversityBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/ui/BackToTop';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <UniversityBar />
      <Navbar />
      {/* pt accounts for fixed UniversityBar (--unibar-h) + Navbar (--nav-h) */}
      <main
        id="main-content"
        tabIndex={-1}
        style={{ paddingTop: 'calc(var(--nav-h) + var(--unibar-h))' }}
      >
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
