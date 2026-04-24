'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Office',
    lines: ['Fell View, West Burton', 'Leyburn, DL8 4JY, Angleterre'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+44 7898 771042'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['maxitransitxy@gmail.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Mon – Fri: 8:00 – 18:00', 'Sat: 9:00 – 13:00'],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Header />

      {/* Hero */}
      <section className="relative pt-44 pb-24 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-accent font-bold tracking-widest uppercase mb-4 text-sm">Get in Touch</h2>
            <h1 className="text-5xl sm:text-6xl font-heading font-extrabold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-xl mx-auto font-light">
              Our team is ready to help you with all your logistics needs.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow">

        {/* Contact Info Cards */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-light border border-gray-100 text-center hover:shadow-lg hover:border-accent/30 transition-all"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-600 text-sm">{line}</p>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Map + Form */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[480px]"
              >
                <iframe
                  title="maxiTransit Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2319.4!2d-1.9793!3d54.2841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487c0!2sWest%20Burton%2C%20Leyburn%20DL8%204JY%2C%20Royaume-Uni!5e0!3m2!1sfr!2suk!4v1714000000000!5m2!1sfr!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-heading font-bold text-dark">Send us a Message</h2>
                  <p className="text-gray-600 mt-2">We typically respond within 24 hours.</p>
                </div>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for reaching out. Our team will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your shipment needs..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] uppercase tracking-wide"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
