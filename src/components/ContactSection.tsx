/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !msg.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMsg('');
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-linear-to-b from-stone-50 to-stone-100/40 relative">
      
      {/* Dynamic Floating WhatsApp CTA Widget in bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-40 group select-none animate-bounce hover:animate-none">
        {/* Hover label */}
        <div className="absolute right-14 bottom-2 bg-stone-900 border border-stone-800 text-stone-100 text-[11px] font-mono px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          💬 Need help? Live on WhatsApp!
        </div>
        
        {/* Pulse glow background ring */}
        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xs opacity-50 animate-ping group-hover:block"></div>
        
        <a
          href="https://wa.me/919999999999" 
          target="_blank" 
          rel="noreferrer"
          id="whatsapp-floating-trigger"
          className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200 cursor-pointer"
        >
          {/* Custom SVG logo representing WhatsApp */}
          <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 1.5 5.2L2 22l5-.8a9.85 9.85 0 0 0 5 1.4A10 10 0 0 0 22 12A10 10 0 0 0 12 2zm5.7 14c-.2.7-1.3 1.3-1.8 1.4c-.5 0-1.1.2-3.1-.6a11.12 11.12 0 0 1-5-4.4c-.6-.9-.9-1.9-.9-2.9c0-1.6.8-2.4 1.1-2.7c.3-.3.8-.4 1.2-.4s.4.1.6.2c.2.1.5.6.6.8s.2.4.1.6c-.1.2-.2.3-.4.5c-.2.2-.4.4-.3.6c.3.5.7 1 1.2 1.4c.7.6 1.3.8 1.6 1c.3.1.5.1.7-.1s.7-.8.9-1.1c.2-.3.4-.2.7-.1s1.7.8 2 .9c.3.1.5.2.6.3s.1.7-.1 1.4z"/>
          </svg>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid boundary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Support Contacts detail (Col: 5) */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full inline-block">
                Get In Touch
              </span>
              <h2 className="text-3xl font-bold font-display tracking-tight text-stone-900 mt-5 leading-tight">
                Our Editorial Desks are Open for You
              </h2>
              <p className="text-sm text-stone-500 mt-4 leading-relaxed font-sans font-normal">
                Have an active print file failure, custom binding spec concern, or royalty payout issue? Connect with our dedicated support agents. We replies under an hour!
              </p>
            </div>

            {/* Quick cards */}
            <div className="space-y-4">
              
              <div className="flex gap-4 p-4.5 bg-white border border-stone-200/80 rounded-xl shadow-3xs">
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 shrink-0 self-start">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-stone-400">Technical Helpdesk</h4>
                  <p className="text-sm font-semibold text-stone-900 mt-1">publishing@mbpublisher.com</p>
                  <p className="text-xs text-stone-500 mt-0.5">We reply 24/7/365 to file format tickets.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4.5 bg-white border border-stone-200/80 rounded-xl shadow-3xs">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-600 shrink-0 self-start">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-stone-400">Author Hotlines</h4>
                  <p className="text-sm font-semibold text-stone-900 mt-1">+91 99999 99999</p>
                  <p className="text-xs text-stone-500 mt-0.5">Mon - Sat, 9:00 AM to 6:00 PM IST.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4.5 bg-white border border-stone-200/80 rounded-xl shadow-3xs">
                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 shrink-0 self-start">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-stone-400">National Press Hubs</h4>
                  <p className="text-xs font-semibold text-stone-900 mt-1">4th Floor, Phase-III, Okhla Industrial Area, New Delhi Central, DL, IN</p>
                  <p className="text-xs text-stone-500 mt-0.5">Visits by appointment only for bulk proof inspections.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Form panel (Col: 7) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-left">
            <h3 className="text-lg font-bold font-display text-stone-950 mb-6">
              Establish a Support Ticket
            </h3>

            {submitted ? (
              <div className="p-8 text-center bg-indigo-50/50 border border-indigo-100 rounded-2xl animate-fade-in flex flex-col items-center">
                <CheckCircle className="h-10 w-10 text-indigo-600 mb-3" />
                <h4 className="text-base font-bold text-stone-900">Support Ticket Established!</h4>
                <p className="text-xs text-stone-500 mt-1 leading-normal max-w-sm">
                  Your reference ticket <b>#PB-{Math.floor(1000 + Math.random() * 9000)}</b> is in queue. An expert typesetter will audit your profile and email you within 45 minutes!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-stone-700">Author Pen Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Brooks"
                      className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 text-stone-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-stone-700">Register E-mail</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. elena@publish.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#4F46E5] text-stone-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">How can our Cover/Typeset team assist?</label>
                  <textarea
                    rows={4}
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Provide details about your page count, cover bleed alignment, or global listing inquiry..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#4F46E5] text-stone-900 placeholder:text-stone-400"
                  />
                </div>

                {/* Submitting Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/15 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  <span>{isSubmitting ? 'Dispatching metrics...' : 'Dispatch Ticket'}</span>
                </button>

              </form>
            )}

            {/* Quick link static info */}
            <div className="mt-6 border-t border-stone-100 pt-5 flex items-start gap-2 text-xs text-stone-500">
              <HelpCircle className="h-4.5 w-4.5 text-[#4F46E5] mt-0.5 shrink-0" />
              <p>For instant self-help on common layouts, ISBNs, and VAT taxes, check out our filterable <b className="text-stone-800">FAQ Database</b> widget before submitting tickets.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
