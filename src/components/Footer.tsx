/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Twitter, Facebook, Instagram, Linkedin, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (view: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, viewId: string) => {
    e.preventDefault();
    onNavClick(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main upper footer block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Logo Brand / Bio block (Col: 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 p-2 rounded-xl text-stone-50 shadow-sm shadow-indigo-600/25">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold font-display tracking-tight text-white">
                  MB Publisher
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#E0E7FF] font-mono -mt-1 font-semibold">
                  SaaS Publishing Platform
                </span>
              </div>
            </div>
            
            <p className="text-xs text-stone-400 font-normal leading-relaxed text-left max-w-sm">
              We empower independent creators, educational cells, and boutique novelists to produce retail-ready softcovers and hardcovers directly on high-definition digital presses.
            </p>

            {/* Social icons list */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors" title="Twitter handle">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors" title="Facebook handle">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors" title="Instagram profile">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors" title="Linkedin Page">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Categorized links columns (Col: 8 total) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            
            {/* Column 1: Company */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-stone-400">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-stone-400 font-medium">
                <li><a onClick={(e) => handleLinkClick(e, 'about')} href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a onClick={(e) => handleLinkClick(e, 'about')} href="#" className="hover:text-white transition-colors">Mission & Vision</a></li>
                <li><a onClick={(e) => handleLinkClick(e, 'about')} href="#" className="hover:text-white transition-colors">The Manifesto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Author Careers</a></li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-stone-400">
                Services
              </h4>
              <ul className="space-y-2 text-xs text-stone-400 font-medium">
                <li><a onClick={(e) => handleLinkClick(e, 'services')} href="#" className="hover:text-white transition-colors">Book Printing</a></li>
                <li><a onClick={(e) => handleLinkClick(e, 'services')} href="#" className="hover:text-white transition-colors">ISBN Registration</a></li>
                <li><a onClick={(e) => handleLinkClick(e, 'services')} href="#" className="hover:text-white transition-colors">Layout formatting</a></li>
                <li><a onClick={(e) => handleLinkClick(e, 'services')} href="#" className="hover:text-white transition-colors">Amazon Listings</a></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-stone-400">
                Resources
              </h4>
              <ul className="space-y-2 text-xs text-stone-400 font-medium">
                <li><a onClick={(e) => handleLinkClick(e, 'pricing')} href="#" className="hover:text-white transition-colors">Live Cost Calculator</a></li>
                <li><a onClick={(e) => handleLinkClick(e, 'faq')} href="#" className="hover:text-white transition-colors">FAQ Knowledge base</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Spine Calculator XML</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bleed Blueprints PDF</a></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-stone-400">
                Rights & Legal
              </h4>
              <ul className="space-y-2 text-xs text-stone-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Copyright Retention</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Principles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR Data rights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Printing</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Minimalist lower footer block */}
        <div className="border-t border-stone-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono gap-4">
          <div>
            &copy; {currentYear} MB Publisher. All intellectual rights reserved.
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
            <span>for Independent Book Authors</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
