/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Award, Palette, Radio, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES_LIST } from '../data';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onPricingRedirect: () => void;
}

export default function ServicesSection({ onSelectService, onPricingRedirect }: ServicesSectionProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Map icon string names to actual components
  const getServiceIcon = (id: string, colorClass: string) => {
    switch (id) {
      case 'printing':
        return <BookOpen className={`h-6 w-6 ${colorClass}`} />;
      case 'publishing':
        return <Award className={`h-6 w-6 ${colorClass}`} />;
      case 'design':
        return <Palette className={`h-6 w-6 ${colorClass}`} />;
      case 'distribution':
        return <Radio className={`h-6 w-6 ${colorClass}`} />;
      default:
        return <ShieldCheck className={`h-6 w-6 ${colorClass}`} />;
    }
  };

  const colors: { [key: string]: { border: string; bg: string; text: string; lightbg: string } } = {
    indigo: {
      border: 'hover:border-indigo-500 border-stone-200/60',
      bg: 'bg-indigo-600',
      text: 'text-indigo-600',
      lightbg: 'bg-indigo-50'
    },
    purple: {
      border: 'hover:border-purple-500 border-stone-200/60',
      bg: 'bg-purple-600',
      text: 'text-purple-600',
      lightbg: 'bg-purple-50'
    },
    amber: {
      border: 'hover:border-amber-500 border-stone-200/60',
      bg: 'bg-amber-600',
      text: 'text-amber-600',
      lightbg: 'bg-amber-50'
    },
    emerald: {
      border: 'hover:border-emerald-500 border-stone-200/60',
      bg: 'bg-emerald-600',
      text: 'text-emerald-600',
      lightbg: 'bg-emerald-50'
    }
  };

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title block */}
        <div className="max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full inline-block">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 mt-5">
            Boutique Services Built for Modern Authors
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed">
            Select an offering below to explore standard specifications, check inclusions, and estimate turnaround schedules.
          </p>
        </div>

        {/* 4 Interactive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES_LIST.map((service) => {
            const currentColors = colors[service.color] || colors.indigo;
            const isSelected = selectedCard === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => setSelectedCard(service.id)}
                className={`text-left p-8 bg-white border rounded-2xl transition-all duration-300 shadow-3xs hover:shadow-lg relative overflow-hidden group cursor-pointer ${
                  isSelected 
                    ? 'border-indigo-600 ring-2 ring-indigo-500/10' 
                    : currentColors.border
                } hover:-translate-y-1`}
              >
                {/* Visual marker inside card */}
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-stone-50 text-[10px] font-mono px-3.5 py-1 rounded-bl-xl font-bold animate-pulse">
                    Active selection
                  </div>
                )}

                {/* Service Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3.5 rounded-xl border border-stone-100 ${currentColors.lightbg}`}>
                    {getServiceIcon(service.id, currentColors.text)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-stone-900 group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-xs font-semibold text-stone-400 font-mono italic">
                      Starting from {service.priceStart}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed font-sans mb-6">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400">
                    What is included in the package:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-stone-700">
                        <CheckCircle className={`h-4 w-4 shrink-0 ${currentColors.text}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="flex items-center justify-between border-t border-stone-100 pt-5 mt-auto">
                  <button 
                    id={`service-act-${service.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service.id);
                    }}
                    className={`text-xs font-bold ${currentColors.text} hover:opacity-85 transition-opacity flex items-center gap-1.5`}
                  >
                    <span>Request specification</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPricingRedirect();
                    }}
                    className="text-xs font-mono px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 font-semibold rounded-lg text-stone-800 transition-colors"
                  >
                    Quick pricing
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Panel based on card clicked */}
        {selectedCard && (
          <div className="bg-linear-to-r from-indigo-50/70 to-orange-50/40 border border-indigo-100 rounded-2xl p-8 text-left max-w-4xl mx-auto animate-fade-in shadow-xs">
            <h4 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></span>
              <span>Specification Details: {SERVICES_LIST.find(s => s.id === selectedCard)?.title}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border-r border-stone-200/60 pr-2">
                <span className="block text-xs uppercase font-mono tracking-wider text-stone-400">Quality Standard</span>
                <p className="text-sm font-semibold text-stone-800 mt-1">Nove-Core digital printing on 80gsm heavy stock. Smudge-proof and bleach-free.</p>
              </div>
              <div className="border-r border-stone-200/60 pr-2">
                <span className="block text-xs uppercase font-mono tracking-wider text-stone-400">Available Sizes</span>
                <p className="text-sm font-semibold text-stone-800 mt-1">A5 (148x210mm), A4, novel format (6x9 inches), and bespoke margins.</p>
              </div>
              <div>
                <span className="block text-xs uppercase font-mono tracking-wider text-stone-400">Lead Timetable</span>
                <p className="text-sm font-semibold text-stone-800 mt-1">7 business days average including typesetting approval & delivery tracking dispatch.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-indigo-100/60">
              <p className="text-xs text-stone-600">Want to test things beforehand? Order a single physical proof sheet for only $9.50 (fully refundable on your first bulk order).</p>
              <button 
                onClick={onPricingRedirect}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-lg text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Launch Price calculator
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
