'use client';

import { motion } from 'framer-motion';
import { Package, Truck, Globe, Box, Shield, Clock } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Ground Cargo',
    description: 'Reliable and cost-effective ground transportation for your freight across borders with full tracking.',
  },
  {
    icon: Globe,
    title: 'Air Freight',
    description: 'Fast and secure air freight solutions for time-sensitive global shipments.',
  },
  {
    icon: Box,
    title: 'Packaging Options',
    description: 'Professional packaging services ensuring your goods arrive in pristine condition.',
  },
  {
    icon: Package,
    title: 'Warehousing',
    description: 'Secure, climate-controlled warehousing solutions tailored to your inventory needs.',
  },
  {
    icon: Shield,
    title: 'Customs Clearance',
    description: 'Expert customs brokerage to take the complexity out of cross-border freight.',
  },
  {
    icon: Clock,
    title: 'Express Delivery',
    description: 'Next-day and same-day delivery options for urgent courier requirements.',
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-heading font-bold text-dark mb-4">
            Global Supply Chain Solutions
          </h2>
          <p className="text-lg text-gray-600">
            Dedicated specialists taking care of your products with innovative technology and logistics management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center text-accent font-semibold hover:text-accent-hover transition-colors">
                  Discover All
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
