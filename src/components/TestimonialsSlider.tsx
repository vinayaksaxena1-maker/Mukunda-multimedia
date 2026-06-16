/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, BookOpen } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSlider() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const prevSlide = () => {
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section className="py-20 bg-stone-100/40 border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full inline-block">
            Author Validation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 mt-5">
            Loved by Indie Novelists Internationally
          </h2>
          <p className="text-sm text-stone-500 mt-3 leading-relaxed">
            See how real writers are bypassing historical agency blockages and holding their premium physical printed editions in days.
          </p>
        </div>

        {/* Carousel stage wrapper */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          {/* Main Card */}
          <div 
            id={`testimonial-carousel-active`} 
            className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-500 animate-fade-in relative min-h-[320px]"
          >
            {/* Absolute quote background vector */}
            <div className="absolute top-6 left-6 text-stone-100 pointer-events-none">
              <Quote className="h-28 w-28 opacity-15" />
            </div>

            {/* Left Col: Mock Rendered Book Cover (Col: 4) */}
            <div className="md:col-span-4 flex justify-center">
              <div 
                className={`w-36 h-52 ${current.coverColor} rounded-r-lg shadow-xl flex flex-col justify-between p-4 text-stone-100 relative overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300`}
                id={`carousel-book-mock-${current.id}`}
              >
                {/* Book decoration folds */}
                <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-black/10"></div>
                <div className="absolute inset-2 border border-white/10 rounded-sm"></div>

                <div className="text-[7.5px] font-mono tracking-widest uppercase">
                  FIRST PRINT EDITION
                </div>

                <div className="my-auto py-2">
                  <h4 className="text-sm font-serif font-bold tracking-tight text-stone-100">
                    {current.bookTitle}
                  </h4>
                  <span className="block text-[8px] text-stone-400 mt-1 uppercase">novel spec</span>
                </div>

                <div className="text-[9px] font-semibold text-stone-300 font-sans mt-auto">
                  {current.name}
                </div>
              </div>
            </div>

            {/* Right Col: Quote Text Content (Col: 8) */}
            <div className="md:col-span-8 text-left space-y-4 relative z-10">
              
              {/* Star ratings representation */}
              <div className="flex items-center gap-1 text-orange-400">
                {Array.from({ length: current.rating }).map((_, rIdx) => (
                  <Star key={rIdx} className="h-4.5 w-4.5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Quote text body */}
              <p className="text-base sm:text-lg text-stone-800 italic font-medium leading-relaxed font-sans">
                "{current.quote}"
              </p>

              {/* Author signature label block */}
              <div className="pt-4 border-t border-stone-100">
                <span className="block text-sm font-extrabold text-stone-900 font-display">
                  {current.name}
                </span>
                <span className="block text-xs text-indigo-600 font-mono font-bold tracking-wider uppercase mt-0.5">
                  {current.role} — Published Author of <span className="underline italic text-stone-700 font-sans lowercase">{current.bookTitle}</span>
                </span>
              </div>

            </div>

          </div>

          {/* Carousel arrow selectors */}
          <div className="flex justify-center md:justify-end gap-3 mt-6 sm:absolute sm:bottom-1/2 sm:translate-y-1/2 sm:justify-between sm:-inset-x-6 sm:mt-0 pointer-events-none">
            <button
              onClick={prevSlide}
              id="testimonial-prev-btn"
              className="p-3 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-indigo-600 shadow-sm transition-all pointer-events-auto cursor-pointer"
              title="Previous testimony"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              id="testimonial-next-btn"
              className="p-3 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-indigo-600 shadow-sm transition-all pointer-events-auto cursor-pointer"
              title="Next testimony"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveIdx(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIdx === idx 
                    ? 'w-6 bg-indigo-600' 
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
