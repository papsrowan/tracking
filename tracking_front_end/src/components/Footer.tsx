'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Contact */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl tracking-tighter">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-white tracking-tight leading-none">maxiTransit</span>
                <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Global Logistics</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              From booking to communications, to payment: Hyper Atlantic Courier helps you transport freight faster, cheaper, safer, and easier, so you can stay focused on your business.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-gray-300">
                <Phone className="w-5 h-5 text-accent mt-1" />
                <div>
                  <span className="block font-bold">+1 (540) 324-3587</span>
                  <span className="text-sm text-gray-500">Mon-Fri 9am-6pm</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Mail className="w-5 h-5 text-accent" />
                <span className="font-medium hover:text-accent cursor-pointer transition-colors">info@hyperatlanticcourier.com</span>
              </div>
              <div className="flex items-start gap-4 text-gray-300">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <span className="leading-snug max-w-[200px]">645 Park Ave, San Jose, CA 95110, United States</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="font-heading font-bold text-xl mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent"></span>
            </h3>
            <ul className="space-y-3 mt-4">
              <li><Link href="/#services" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all">Air Freight</Link></li>
              <li><Link href="/#services" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all">Sea Freight</Link></li>
              <li><Link href="/#services" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all">Ground Cargo</Link></li>
              <li><Link href="/#services" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all">Packaging Options</Link></li>
              <li><Link href="/#tracking" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all">Track Your Shipment</Link></li>
              <li><Link href="/calculator" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="font-heading font-bold text-xl mb-6 relative inline-block">
              Subscribe Newsletter
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent"></span>
            </h3>
            <p className="text-gray-400 mb-6 mt-4">
              Get the latest updates on logistics and supply chain management directly in your inbox.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-accent-hover text-white px-4 rounded flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} maxiTransit. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
