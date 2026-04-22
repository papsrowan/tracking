'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TrackingSearch } from './TrackingSearch';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden bg-primary-dark">
      {/* Background Image/Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c663be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-accent font-bold tracking-widest uppercase mb-4 text-sm">
              Transport Logistics
            </h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight mb-6">
              Quickest & Safe <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Delivery</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Take the complexity out of customs. Freight solutions with expert customs brokerage services tailored for your business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded font-bold hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] uppercase text-sm tracking-wide"
            >
              Discover All
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded font-bold hover:bg-white/20 transition-colors uppercase text-sm tracking-wide"
            >
              All Services
            </Link>
          </motion.div>
        </div>

        {/* Embedded Tracking Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-2xl shadow-2xl relative"
          id="tracking"
        >
          <div className="absolute -top-4 left-8 bg-accent text-white px-4 py-1 rounded font-bold text-sm tracking-wide uppercase shadow-lg">
            Track Shipment
          </div>
          <TrackingSearch />
        </motion.div>
      </div>
    </section>
  );
}
