'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Steve Macholnad',
    role: 'Import Manager',
    content: 'As a first time importer from the Far East, the process can be quite daunting. Transit Tracking has provided exceptional service and support right through the process.',
  },
  {
    name: 'Alex Olevnik',
    role: 'Logistics Director',
    content: 'Transit Tracking has provided exceptional service and support right through the process. They make complex global supply chains look easy.',
  },
  {
    name: 'Jack Abraham',
    role: 'E-commerce Owner',
    content: 'From booking to communications, to payment, they help transport freight faster, cheaper, safer, and easier. I can stay focused on my business.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[20px] border-white"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-[20px] border-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              Trusted By The World's Best Companies
            </h2>
            <p className="text-lg text-gray-300">
              See what our clients say about our logistics and freight services.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/10" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-200 mb-8 leading-relaxed italic relative z-10">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <span className="text-accent text-sm uppercase tracking-wider">{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
