import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ServicesGrid } from '@/components/ServicesGrid';
import { Testimonials } from '@/components/Testimonials';
import { Partners } from '@/components/Partners';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-light">
      <Header />
      
      <main>
        <Hero />
        
        {/* Services Section */}
        <div id="services">
          <ServicesGrid />
        </div>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Partners Section */}
        <div id="partners">
          <Partners />
        </div>
      </main>

      <Footer />
    </div>
  );
}
