import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShippingCalculator } from '@/components/ShippingCalculator';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-dark mb-4">
              Estimate Your Shipping Cost
            </h2>
            <p className="text-lg text-gray-600">
              Find out the approximate cost of delivery of your shipments worldwide.
            </p>
          </div>
          <ShippingCalculator />
        </div>
      </main>

      <Footer />
    </div>
  );
}
