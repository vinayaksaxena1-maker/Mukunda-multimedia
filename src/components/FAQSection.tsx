/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Search } from 'lucide-react';
import { FAQs } from '../data';

type CategoryType = 'all' | 'publishing' | 'pricing' | 'design' | 'delivery';

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [openId, setOpenId] = useState<number | null>(1); // default open first item
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All FAQs' },
    { id: 'publishing', label: 'Rights & Publishing' },
    { id: 'pricing', label: 'Costs & Volume Discount' },
    { id: 'design', label: 'Typography & Cover Design' },
    { id: 'delivery', label: 'Printing & Delivery schedules' },
  ];

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Filter items based on active category and/or query filter
  const filteredFAQs = FAQs.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title block */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full inline-block">
            FAQ Database
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 mt-5">
            Solutions to Common Author Queries
          </h2>
          <p className="text-sm text-stone-500 mt-3 leading-relaxed">
            Need custom guidance on templates bleed layout, barcoding, or royalties? Read our direct answers below.
          </p>
        </div>

        {/* Search bar & Category Filters */}
        <div className="mb-10 space-y-4">
          
          {/* Search box */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute inset-y-0 left-3 h-4 w-4 text-stone-400 my-auto" />
            <input
              type="text"
              placeholder="Search keyword in FAQs (e.g. ISBN, paper, turnaround...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:border-indigo-500 text-stone-900 shadow-3xs"
            />
          </div>

          {/* Interactive Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Auto-open first item of filtered list on category change
                  const firstMatch = FAQs.find(f => cat.id === 'all' || f.category === cat.id);
                  setOpenId(firstMatch ? firstMatch.id : null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-stone-50 shadow-xs'
                    : 'bg-white border border-stone-200/85 hover:border-stone-400 text-stone-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* FAQ Accordion Lists */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4 divide-y-0 text-left">
            {filteredFAQs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-3xs transition-colors duration-200 hover:border-stone-300"
                >
                  {/* Accordion Trigger header */}
                  <button
                    onClick={() => handleToggle(faq.id)}
                    className="w-full px-6 py-4.5 flex justify-between items-center text-left focus:outline-hidden gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-stone-900 font-display leading-tight pr-2">
                      {faq.question}
                    </span>
                    <span className="p-1.5 rounded-lg bg-stone-100 text-stone-500 group-hover:text-indigo-600 shrink-0">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {/* Accordion expanding answer content */}
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 animate-fade-in border-t border-stone-100/70">
                      <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                      
                      {/* Interactive meta helper info */}
                      <div className="mt-4 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                        <span>Category: <b className="uppercase">{faq.category}</b></span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-indigo-500" />
                          <span>100% verified answer</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 bg-white rounded-2xl border border-stone-200 text-center text-stone-500 text-xs">
            No matching FAQ guidelines identified for "<b>{searchQuery}</b>". Please clear keyword filter.
          </div>
        )}

        {/* Dynamic Helpdesk footer support */}
        <div className="mt-12 text-center p-6 bg-linear-to-r from-orange-50/50 to-indigo-50/50 border border-stone-200/50 rounded-2xl">
          <HelpCircle className="h-7 w-7 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-stone-900 font-display">Still have unanswered print spec questions?</h4>
          <p className="text-xs text-stone-500 mt-1">Our live cover layout editors and typesetters are active now.</p>
          <div className="mt-3 flex justify-center gap-3">
            <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-lg text-xs transition-colors cursor-pointer">
              Send tickets
            </button>
            <a 
              href="https://wa.me/919999999999" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-stone-50 font-bold rounded-lg text-xs transition-colors inline-block"
            >
              Live WhatsApp Chat
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
