/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sliders, HelpCircle, FileText, Settings, Sparkles, Check, Truck } from 'lucide-react';

export default function PricingCalculator() {
  // Inputs
  const [pages, setPages] = useState<number>(180);
  const [size, setSize] = useState<'A5' | '6x9' | 'Custom'>('A5');
  const [isColor, setIsColor] = useState<boolean>(false);
  const [binding, setBinding] = useState<'paperback' | 'hardcover'>('paperback');
  const [quantity, setQuantity] = useState<number>(50);

  // Computed Outputs
  const [unitCost, setUnitCost] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [printingDays, setPrintingDays] = useState<number>(5);

  const calculateFares = (pPages: number, pSize: 'A5' | '6x9' | 'Custom', pIsColor: boolean, pBinding: 'paperback' | 'hardcover', pQuantity: number) => {
    // Size multi
    let sizeFactor = 1.0;
    if (pSize === '6x9') sizeFactor = 1.25;
    if (pSize === 'Custom') sizeFactor = 1.45;

    // Binding Base Fee
    const bindingFee = pBinding === 'hardcover' ? 4.80 : 1.80;

    // Pages Fee
    const costPerPage = pIsColor ? 0.05 : 0.015;
    const pagesFee = pPages * costPerPage;

    // Base book unit cost
    const bookBase = (bindingFee + pagesFee) * sizeFactor;

    // Volume discount
    let discount = 1.0;
    if (pQuantity >= 500) discount = 0.70; // 30% off
    else if (pQuantity >= 100) discount = 0.80; // 20% off
    else if (pQuantity >= 50) discount = 0.90; // 10% off
    else if (pQuantity >= 10) discount = 0.95; // 5% off

    const adjustedUnitCost = Math.max(1.50, Number((bookBase * discount).toFixed(2)));
    const printingCharge = adjustedUnitCost * pQuantity;
    
    // Setup plates surcharge for small batches
    const setupFee = pQuantity >= 50 ? 0 : 25.00;
    const finalTotal = Number((printingCharge + setupFee).toFixed(2));

    // Printing Days Estimate
    let days = 4;
    if (pQuantity > 500) days = 9;
    else if (pQuantity > 100) days = 7;
    else if (pQuantity > 50) days = 5;
    else if (pQuantity > 10) days = 4;
    else days = 3;

    if (pBinding === 'hardcover') days += 2; // Extra gluing setup
    if (pIsColor) days += 1;

    return {
      unit: adjustedUnitCost,
      total: finalTotal,
      days: days
    };
  };

  // Run calculation effect
  useEffect(() => {
    const { unit, total, days } = calculateFares(pages, size, isColor, binding, quantity);
    setUnitCost(unit);
    setTotalCost(total);
    setPrintingDays(days);
  }, [pages, size, isColor, binding, quantity]);

  // Handle Stepper
  const adjustQuantity = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  // Pre-calculate Reference quantities (10, 50, 100 copies)
  const refQuantities = [10, 50, 100];
  const refRates = refQuantities.map(q => {
    const calc = calculateFares(pages, size, isColor, binding, q);
    return {
      qty: q,
      unit: calc.unit,
      total: calc.total,
      days: calc.days
    };
  });

  return (
    <section className="py-20 bg-linear-to-b from-stone-50 to-stone-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full inline-block">
            Investment Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 mt-5">
            Instant Cost Estimations & Calculations
          </h2>
          <p className="text-sm sm:text-base text-stone-500 mt-3 leading-relaxed">
            Ditch complex agency sales pipelines. Drag our slider systems to configure your exact paper formatting and see wholesale prices in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          
          {/* CALCULATOR INPUT FORM PANEL (Col: 7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-8 text-left">
            
            {/* Header Badge */}
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Sliders className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-bold font-display text-stone-900 leading-none">Configure Physical Asset specs</h3>
            </div>

            {/* Slider: Page Count */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-stone-400" />
                  <span>Manuscript Page Count</span>
                </label>
                <span className="font-mono bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-md text-xs border border-indigo-100">
                  {pages} pages
                </span>
              </div>
              <input
                type="range"
                min="24"
                max="800"
                step="4"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                id="page-count-slider"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                <span>Min: 24 pgs</span>
                <span>Max: 800 pgs</span>
              </div>
            </div>

            {/* Select Layout: Size and Binding */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Dropdown: Size selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800">
                  Physical Digest Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as 'A5' | '6x9' | 'Custom')}
                  className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50 font-sans text-sm font-semibold text-stone-900 focus:outline-hidden focus:border-indigo-500"
                  id="book-size-select"
                >
                  <option value="A5">A5 (148 x 210 mm) - Standard Novel</option>
                  <option value="6x9">6 x 9 inches - US Trade Standard</option>
                  <option value="Custom">Bespoke Custom margins (1.45x)</option>
                </select>
              </div>

              {/* Toggle Binding Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800">
                  Cover Block & Bindings
                </label>
                <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1.5 rounded-lg border border-stone-200">
                  <button
                    onClick={() => setBinding('paperback')}
                    className={`py-1.5 px-3 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      binding === 'paperback' 
                        ? 'bg-white text-indigo-700 shadow-3xs' 
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    Paperback
                  </button>
                  <button
                    onClick={() => setBinding('hardcover')}
                    className={`py-1.5 px-3 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      binding === 'hardcover' 
                        ? 'bg-white text-indigo-700 shadow-3xs' 
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    Hardcover
                  </button>
                </div>
              </div>

            </div>

            {/* Toggle Ink / Color */}
            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-left">
                <span className="block text-sm font-semibold text-stone-900">Premium Ink color profiles</span>
                <p className="text-xs text-stone-500 mt-1">Check to use high-definition full color prints instead of standard monochrome black & white.</p>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setIsColor(!isColor)}
                  id="calc-ink-toggle"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    isColor ? 'bg-indigo-600' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isColor ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs font-bold font-mono ml-3 text-stone-700 w-12 text-left">
                  {isColor ? 'COLOR' : 'B&W'}
                </span>
              </div>
            </div>

            {/* Quantity Stepper +/- */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-stone-800">
                Print Order Quantity
              </label>
              
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-100 border border-stone-200 max-w-[280px]">
                <button
                  onClick={() => adjustQuantity(-10)}
                  disabled={quantity === 1}
                  className="p-2 h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-stone-700 disabled:opacity-40 shadow-3xs hover:bg-stone-50 cursor-pointer text-sm"
                >
                  -10
                </button>
                <button
                  onClick={() => adjustQuantity(-1)}
                  disabled={quantity === 1}
                  className="p-2 h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-stone-700 disabled:opacity-40 shadow-3xs hover:bg-stone-50 cursor-pointer text-sm"
                >
                  -1
                </button>
                
                <span className="text-base font-extrabold font-mono text-indigo-700 min-w-[60px] text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => adjustQuantity(1)}
                  className="p-2 h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-stone-700 shadow-3xs hover:bg-stone-50 cursor-pointer text-sm"
                >
                  +1
                </button>
                <button
                  onClick={() => adjustQuantity(10)}
                  className="p-2 h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-stone-700 shadow-3xs hover:bg-stone-50 cursor-pointer text-sm"
                >
                  +10
                </button>
              </div>

              <div className="flex gap-2 pt-2">
                {[1, 10, 50, 100, 500].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setQuantity(preset)}
                    className={`px-3 py-1 text-xs rounded-md border font-mono font-medium cursor-pointer transition-colors ${
                      quantity === preset 
                        ? 'bg-indigo-600 border-indigo-600 text-stone-50' 
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-600'
                    }`}
                  >
                    {preset} {preset === 1 ? 'copy' : 'copies'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* CALCULATOR OUTPUT PERFORMANCE PANEL (Col: 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Quote Summary Display */}
            <div className="bg-linear-to-b from-indigo-950 to-stone-950 p-8 rounded-3xl text-stone-100 text-left shadow-xl border border-indigo-950/40 relative overflow-hidden">
              {/* Accent vector shapes */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600 rounded-full blur-2xl opacity-40"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-orange-500 rounded-full blur-xl opacity-20"></div>

              <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold font-mono tracking-widest uppercase">
                <Sparkles className="h-4 w-4 animate-pulse text-orange-400" />
                <span>PageBound Live Pricing</span>
              </div>

              {/* Total Cost Display */}
              <div className="mt-6 mb-8">
                <span className="block text-xs text-stone-400 uppercase font-mono tracking-wider font-semibold">Total estimated cost</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
                    ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-stone-400 italic">Net Amount</span>
                </div>
              </div>

              {/* Itemized specs list */}
              <div className="border-t border-stone-100/10 pt-6 space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center text-stone-300">
                  <span>Paper Spec:</span>
                  <span className="text-stone-100 font-semibold uppercase">{size} | Cream 80gsm</span>
                </div>
                
                <div className="flex justify-between items-center text-stone-300">
                  <span>Binding Setup:</span>
                  <span className="text-stone-100 font-semibold uppercase">{binding} pack</span>
                </div>

                <div className="flex justify-between items-center text-stone-300">
                  <span>Ink Premium profile:</span>
                  <span className="text-stone-100 font-semibold">{isColor ? 'HIGH INK GLOSS' : 'DIGITAL MONOCHROME'}</span>
                </div>

                <div className="flex justify-between items-center text-[#E0E7FF] text-sm pt-2 border-t border-stone-100/5">
                  <span>Average Cost per Copy:</span>
                  <span className="text-orange-400 font-extrabold font-sans text-base">${unitCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Estimated Dispatch schedule */}
              <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4.5 flex items-center gap-3.5">
                <div className="p-2.5 bg-orange-500 text-indigo-950 rounded-lg">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-stone-300 uppercase tracking-widest font-mono">Guaranteed print schedule</span>
                  <p className="text-sm font-semibold text-white mt-0.5">{printingDays} Business Days</p>
                  <p className="text-[10px] text-stone-400 mt-0.5 font-light font-sans">Ready to dispatch from our Bangalore/Delhi presses</p>
                </div>
              </div>
            </div>

            {/* Quick reference block: copies comparison table */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-left shadow-3xs">
              <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider font-mono mb-4 flex items-center gap-1.5">
                <span>⚡ Volume comparison rate card</span>
              </h4>
              
              <div className="divide-y divide-stone-100">
                {refRates.map((rr) => (
                  <div key={rr.qty} className="py-3 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-mono text-[9px] font-bold text-indigo-700">
                        {rr.qty}
                      </div>
                      <span className="font-semibold text-stone-800">
                        {rr.qty} printed copies
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-stone-900 font-bold font-mono text-sm">
                        ${rr.total.toLocaleString()}
                      </span>
                      <span className="block text-[10px] text-stone-500">
                        (${rr.unit.toFixed(2)} each) · {rr.days} days
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Volume Discount Info badge */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-xs text-stone-600 leading-normal">
                  <b>No plate configuration surcharge</b> for orders of <b>50 copies or more</b>. Volume discounts up to <b>30%</b> automatically apply on custom large runs.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
