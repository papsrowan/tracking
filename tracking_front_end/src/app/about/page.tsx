'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Globe, Award, TrendingUp } from 'lucide-react';

const milestones = [
  { year: '2005', title: 'Foundation', description: 'maxiTransit was founded in Brussels with a single warehouse and a team of 5 passionate logistics experts.' },
  { year: '2009', title: 'European Expansion', description: 'We expanded operations across Western Europe, establishing partnerships with major freight carriers.' },
  { year: '2013', title: 'Digital Transformation', description: 'Launched our real-time parcel tracking platform, revolutionizing transparency in transit logistics.' },
  { year: '2018', title: 'Global Network', description: 'Reached 80+ countries in our delivery network, with strategic hubs in Asia, Americas, and Africa.' },
  { year: '2023', title: 'Industry Leader', description: 'Recognized as one of Europe\'s top logistics companies with 500+ professionals across 12 countries.' },
];

const stats = [
  { icon: Globe, value: '80+', label: 'Countries Served' },
  { icon: Users, value: '500+', label: 'Professionals' },
  { icon: TrendingUp, value: '2M+', label: 'Parcels Delivered' },
  { icon: Award, value: '19', label: 'Years of Excellence' },
];

const values = [
  { title: 'Reliability', description: 'We deliver on our promises. Every shipment, every time.' },
  { title: 'Transparency', description: 'Real-time tracking and complete visibility at every step.' },
  { title: 'Innovation', description: 'Continuously improving our technology and processes.' },
  { title: 'Sustainability', description: 'Committed to reducing our carbon footprint in global logistics.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Header />

      {/* Hero */}
      <section className="relative pt-44 pb-28 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-accent font-bold tracking-widest uppercase mb-4 text-sm">Since 2005</h2>
            <h1 className="text-5xl sm:text-6xl font-heading font-extrabold text-white leading-tight mb-6">
              About maxiTransit
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Nearly two decades of connecting businesses and people across the globe with reliable, innovative freight solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow">

        {/* Stats */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <p className="text-4xl font-heading font-extrabold text-primary">{stat.value}</p>
                    <p className="text-gray-600 mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-heading font-bold text-dark mb-6">
                  Our Story — From Brussels to the World
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2005 in the heart of Brussels, maxiTransit started with a bold ambition: to make international freight as simple and transparent as sending an email.
                  </p>
                  <p>
                    Our founders, seasoned logistics veterans with decades of combined experience, saw an industry stuck in outdated processes. They built maxiTransit on three pillars — <strong className="text-dark">technology, transparency, and trust</strong>.
                  </p>
                  <p>
                    Today, we operate from 12 offices across Europe, Asia, and the Americas, handling over 2 million parcels annually for thousands of businesses ranging from local e-commerce shops to multinational corporations.
                  </p>
                </div>
                <ul className="mt-8 space-y-3">
                  {['ISO 9001 Certified Operations', 'Member of FIATA (International Federation of Freight Forwarders)', 'EU Authorized Economic Operator (AEO)', 'Carbon-neutral shipping options available'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1494961104209-3c223057bd26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cargo ship at sea"
                  className="rounded-2xl object-cover h-56 w-full shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=800&auto=format&fit=crop"
                  alt="Shipping containers"
                  className="rounded-2xl object-cover h-56 w-full shadow-lg mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Logistics warehouse"
                  className="rounded-2xl object-cover h-56 w-full shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800&auto=format&fit=crop"
                  alt="Cargo aircraft"
                  className="rounded-2xl object-cover h-56 w-full shadow-lg mt-8"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-dark mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600">Key milestones that shaped who we are today</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gray-100 hidden md:block" />
              <div className="space-y-12">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="flex-1 text-center md:text-right" style={{ textAlign: i % 2 === 1 ? 'left' : undefined }}>
                      {i % 2 === 0 && (
                        <div className={`${i % 2 === 1 ? '' : 'md:text-right'}`}>
                          <span className="text-accent font-bold text-2xl font-heading">{milestone.year}</span>
                          <h3 className="text-xl font-bold text-dark mt-1">{milestone.title}</h3>
                          <p className="text-gray-600 mt-2 max-w-sm ml-auto">{milestone.description}</p>
                        </div>
                      )}
                      {i % 2 === 1 && <div />}
                    </div>
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-lg shadow-accent/30">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      {i % 2 === 1 && (
                        <div>
                          <span className="text-accent font-bold text-2xl font-heading">{milestone.year}</span>
                          <h3 className="text-xl font-bold text-dark mt-1">{milestone.title}</h3>
                          <p className="text-gray-600 mt-2 max-w-sm">{milestone.description}</p>
                        </div>
                      )}
                      {i % 2 === 0 && <div />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-300">The principles that guide everything we do</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
