'use client';

import { motion } from 'framer-motion';
import { usePartners } from '@/hooks/useApi';
import { Partner } from '@/types';

export function Partners() {
  const { data: partners, isLoading } = usePartners();

  if (isLoading) {
    return (
      <section id="partners" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
          </div>
          <div className="flex justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-32 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
          <p className="mt-4 text-gray-600">Trusted by leading logistics companies worldwide</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners?.map((partner: Partner, index: number) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center w-40 h-20 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
            >
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="font-semibold text-gray-700">{partner.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
