/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Zap, Bookmark, Layers, Globe, Layout, Printer, ShieldCheck } from 'lucide-react';
import { BENTO_FEATURES } from '../data';

// Map icon string name to actual Lucide component
const getIcon = (name: string) => {
  switch (name) {
    case 'Zap': return <Zap className="h-5 w-5" />;
    case 'Bookmark': return <Bookmark className="h-5 w-5" />;
    case 'Layers': return <Layers className="h-5 w-5" />;
    case 'Globe': return <Globe className="h-5 w-5" />;
    case 'Layout': return <Layout className="h-5 w-5" />;
    case 'Printer': return <Printer className="h-5 w-5" />;
    default: return <ShieldCheck className="h-5 w-5" />;
  }
};

export default function BentoFeatures() {
  return (
    <section className="py-20 bg-stone-100/30 border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
            Unrivaled Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 mt-5">
            Full-Stack Self-Publishing Made Effortless
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
            Whether you want a single archival paperback or a worldwide digital retail product rollout, our software manages the heavy lifting seamlessly.
          </p>
        </div>

        {/* Bento Grid Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BENTO_FEATURES.map((feat, idx) => {
            // Apply col-span-2 to the 1st and 5th items to make progress asymmetrical & joyful
            const layoutClass = (idx === 0 || idx === 4) 
              ? 'lg:col-span-2' 
              : 'lg:col-span-1';

            return (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                className={`${layoutClass} group text-left p-8 bg-stone-50 hover:bg-white border border-stone-200/70 hover:border-indigo-500/30 rounded-2xl transition-all duration-300 relative overflow-hidden shadow-xs hover:shadow-lg hover:shadow-indigo-600/5 flex flex-col justify-between`}
              >
                {/* Visual anchor line */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-600 group-hover:via-purple-500 group-hover:to-orange-400 transition-colors duration-500" />
                
                {/* Content Top */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="p-3 bg-stone-100 group-hover:bg-indigo-600 text-stone-700 group-hover:text-stone-100 rounded-xl transition-all duration-300 shadow-3xs">
                      {getIcon(feat.iconName)}
                    </div>
                    <span className="text-xs tracking-wider font-mono px-2.5 py-1 rounded-md border bg-stone-100 border-stone-200 text-stone-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-indigo-700 transition-colors font-medium">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-indigo-600 transition-colors font-display mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm font-normal text-stone-600 group-hover:text-stone-800 transition-colors leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Micro hover indicator */}
                <div className="mt-8 flex items-center text-xs font-semibold text-stone-400 group-hover:text-indigo-600 gap-1.5 transition-colors cursor-pointer">
                  <span>Learn more about {feat.title}</span>
                  <span className="transform transition-transform text-lg group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Under Grid Stats Highlight */}
        <div className="mt-16 bg-linear-to-r from-indigo-600/5 via-stone-100/50 to-orange-500/5 border border-stone-200/50 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-stone-900 font-display">Need Custom Spine Calculations and Layout Blueprints?</h4>
            <p className="text-sm text-stone-600 mt-1">Our system generates pixel-perfect layout sheets automatically as soon as your manuscript PDF is uploaded.</p>
          </div>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-lg text-sm transition-all shrink-0 shadow-xs shadow-indigo-600/10 cursor-pointer">
            Explore templates
          </button>
        </div>

      </div>
    </section>
  );
}
