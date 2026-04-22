'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#tracking', label: 'Track Shipment' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Contact Bar */}
      <div className={`bg-white transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-xs font-medium text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-accent cursor-pointer transition-colors">
              <Phone className="w-3 h-3 text-accent" />
              +1 (540) 324-3587
            </span>
            <span className="hidden sm:flex items-center gap-2 hover:text-accent cursor-pointer transition-colors">
              <Mail className="w-3 h-3 text-accent" />
              info@hyperatlanticcourier.com
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 hover:text-accent cursor-pointer transition-colors">
            <MapPin className="w-3 h-3 text-accent" />
            645 Park Ave, San Jose, CA 95110
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white font-heading font-bold text-xl tracking-tighter">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-white tracking-tight leading-none">maxiTransit</span>
                <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Global Logistics</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-accent transition-colors text-sm font-semibold uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/calculator" className="px-6 py-3 bg-accent text-white rounded font-bold hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_20px_rgba(255,107,0,0.5)]">
                Get a Quote
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark border-t border-white/10"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-accent transition-colors font-medium py-3 border-b border-white/5 uppercase text-sm tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/calculator" className="mt-4 px-4 py-3 bg-accent text-center text-white rounded font-bold hover:bg-accent-hover transition-colors">
                  Get a Quote
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
