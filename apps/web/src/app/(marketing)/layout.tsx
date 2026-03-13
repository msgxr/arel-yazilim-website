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
      <main id="main-content" tabIndex={-1} className="pt-[72px]">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
