/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Check, Award } from 'lucide-react';

interface HeroSectionProps {
  onPublishClick: () => void;
  onPricingClick: () => void;
}

export default function HeroSection({ onPublishClick, onPricingClick }: HeroSectionProps) {
  const [rotated, setRotated] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-linear-to-b from-stone-50 via-stone-50 to-stone-100/50">
      {/* Decorative vector meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-12 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Promo Pill */}
            <div className="inline-flex items-center gap-1.5 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-600" />
              <span>Premium Print-On-Demand for Creators</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-stone-900 leading-[1.08] mb-6">
              Turn Your Manuscript Into a{' '}
              <span className="block mt-2 bg-linear-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                Published Book
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal">
              Professional Book Printing, Publishing & Distribution Services. Get bookstore-quality hardcovers, perfect barcoded paperbacks, and instant worldwide retail entry inside one unified author dashboard.
            </p>

            {/* Actions CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                id="hero-cta-publish"
                onClick={onPublishClick}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Publish My Book</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-pricing"
                onClick={onPricingClick}
                className="w-full sm:w-auto px-8 py-4 bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 hover:border-stone-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Get Live Pricing</span>
              </button>
            </div>

            {/* Inline Badges */}
            <div className="mt-8 pt-8 border-t border-stone-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium justify-center lg:justify-start">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>No Minimum Order</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium justify-center lg:justify-start">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Keep 100% Royalties</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium justify-center lg:justify-start">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Global Libraries Distribution</span>
              </div>
            </div>
          </div>

          {/* Hero Right Content: 3D Spine Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Interactive perspective stage */}
            <div 
              className="relative w-80 h-[420px] transition-all duration-700 cursor-pointer select-none"
              style={{ perspective: '1200px' }}
              onMouseEnter={() => setRotated(true)}
              onMouseLeave={() => setRotated(false)}
              onClick={() => setRotated(!rotated)}
              id="spine-stage-mockup"
            >
              {/* Inner floating container */}
              <div 
                className="w-full h-full relative transition-transform duration-700 transform"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  transform: rotated ? 'rotateY(-28deg) rotateX(10deg)' : 'rotateY(-14deg) rotateX(5deg)' 
                }}
              >
                
                {/* Book Spine (3D edge) */}
                <div 
                  className="absolute bg-indigo-950 left-0 top-0 w-8 h-[400px] origin-right transition-colors"
                  style={{ 
                    transform: 'rotateY(-90deg) translateZ(8px)',
                    boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.5)'
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-between py-6 text-center text-stone-100 font-mono text-[9px] font-bold select-none uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
                    <span className="text-orange-400">MB PUBLISHER</span>
                    <span className="text-indigo-200">The Novel Canvas — Clara Winters</span>
                    <span>VOL. I</span>
                  </div>
                </div>

                {/* Primary Book Cover Face */}
                <div 
                  className="absolute inset-0 bg-indigo-900 border-r-2 border-indigo-950 rounded-r-lg shadow-2xl flex flex-col justify-between p-7 text-stone-50 overflow-hidden"
                  style={{ 
                    transform: 'translateZ(8px)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Premium geometric visual inside cover */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-0 right-0 w-52 h-52 rounded-full border border-stone-50 rotating"></div>
                    <div className="absolute bottom-10 left-10 w-44 h-44 rounded-full border border-stone-50"></div>
                    <div className="absolute inset-x-8 top-12 bottom-12 border border-stone-100"></div>
                  </div>

                  {/* Top stamp */}
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-[9px] font-bold text-indigo-950">PB</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-mono">COLLECTIVE</span>
                    </div>
                    <Award className="h-4 w-4 text-orange-400" />
                  </div>

                  {/* Book Title stamp */}
                  <div className="my-auto relative z-10 py-4">
                    <span className="block text-xs uppercase tracking-widest text-orange-400 font-mono font-semibold mb-2">
                      LIMITED HARDCOVER EDITION
                    </span>
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-stone-100 leading-tight">
                      The Novel
                      <span className="block text-orange-500">Canvas</span>
                    </h2>
                    <p className="text-[11px] text-stone-300 mt-4 leading-relaxed font-sans font-light">
                      A masterpiece detailing color structures, composition grids, and printing guidelines for aspiring modern novelists.
                    </p>
                  </div>

                  {/* Author Stamp */}
                  <div className="flex justify-between items-end relative z-10 border-t border-stone-100/20 pt-4">
                    <div>
                      <span className="block text-[8px] tracking-wider text-stone-400 uppercase font-mono">Authored By</span>
                      <span className="text-sm font-semibold text-stone-100">Clara Winters</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] tracking-wider text-stone-400 uppercase font-mono">Binding</span>
                      <span className="text-xs font-semibold text-orange-400">Archival Sewed</span>
                    </div>
                  </div>
                </div>

                {/* Back cover shadow panel beneath */}
                <div 
                  className="absolute bg-stone-900/10 rounded-lg"
                  style={{ 
                    transform: 'translateZ(-10px) rotateY(0deg)',
                    width: '100%',
                    height: '100%',
                    filter: 'blur(15px)'
                  }}
                ></div>

              </div>

              {/* Hover Instructions Floating Badge */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-stone-900 text-stone-100 text-xs px-3 py-1 rounded-full font-mono shadow-md flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span>Hover / click to rotate book mockup</span>
              </div>
            </div>

            {/* Quick Metrics under cover */}
            <div className="mt-16 bg-white/70 backdrop-blur-xs border border-stone-200/50 p-4.5 rounded-xl flex items-center gap-4 shadow-sm w-full max-w-sm">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase text-stone-400 tracking-wider font-mono">Standard Paper Quality</span>
                <p className="text-sm font-semibold text-stone-800">80gsm Acid-free Cream Stock</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
