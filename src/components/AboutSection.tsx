/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Compass, Heart, Globe, MessageSquare, Linkedin, UserPlus } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';

export default function AboutSection() {
  const [activeFave, setActiveFave] = useState<number | null>(null);

  const stats = [
    { id: 'stats-book', value: '5,000+', label: 'Books Printed', desc: 'Across high-fidelity hardcovers, paperbacks, and custom pamphlets.', color: 'border-indigo-100 text-indigo-600 bg-indigo-50/50' },
    { id: 'stats-auth', value: '1,200+', label: 'Published Authors', desc: 'Indie creators, educators, academic presses, and poets worldwide.', color: 'border-amber-100 text-amber-600 bg-amber-50/50' },
    { id: 'stats-cities', value: '50+', label: 'Cities Served', desc: 'Domestic printing hubs and global distribution warehouses.', color: 'border-emerald-100 text-emerald-600 bg-emerald-50/50' },
  ];

  const faveGenres: { [key: number]: string } = {
    1: "Indie fiction & Magical realism",
    2: "Academic typesetting & Vintage design catalogs",
    3: "Modern typography & Minimalist cover graphics",
    4: "Supply chain mapping & Global postage hacks"
  };

  return (
    <section className="py-20 bg-linear-to-b from-stone-50 to-stone-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid: Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left Text Detail */}
          <div className="text-left">
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full inline-block">
              Our Genesis Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 mt-5 leading-tight">
              An Author-First Approach to Modern Publishing
            </h2>
            
            <p className="text-sm sm:text-base text-stone-600 mt-6 leading-relaxed font-sans font-normal">
              PageBound was founded in 2021 by a team of indie authors, veteran editors, and printing engineers who felt traditional printing felt too clunky and slow. Traditional houses locked manuscripts behind endless review lines, while cheap online web-printers delivered poor bindings and blurry fonts.
            </p>
            <p className="text-sm sm:text-base text-stone-600 mt-4 leading-relaxed font-sans font-normal">
              We decided to write a software pipeline that sits directly on top of commercial high-definition digital presses. By automating typesetting layout checks, pre-flight file validation, barcode creation, and global distribution feeds, we slashed time-to-market.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Mission Driven</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Democratizing physical typography so every voice is physical.</p>
                </div>
              </div>
              
              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Craftsmanship Always</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Custom spine calculations and archival paper materials.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Vector Illustration Graphic or Custom Mock */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 to-orange-500/10 rounded-3xl blur-2xl transform rotate-3" />
            
            <div className="relative bg-white border border-stone-200/60 p-8 rounded-3xl shadow-xl max-w-md w-full">
              <div className="absolute top-4 right-4 text-orange-500/15">
                <Award className="h-24 w-24" />
              </div>
              
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#4F46E5] font-semibold">
                OUR VALUE PLATFORMS
              </span>
              
              <h3 className="text-xl font-bold font-display text-stone-950 mt-2 mb-6">
                The PageBound manifesto
              </h3>

              {/* Value list */}
              <div className="space-y-4 text-left">
                <div className="border-l-2 border-indigo-600 pl-4 py-1">
                  <span className="block text-xs font-semibold text-stone-900 font-display">Author Retains 100% Core Rights</span>
                  <p className="text-xs text-stone-500 mt-0.5">We print books. We distribute books. We never hijack your hard-earned copyright structure.</p>
                </div>
                
                <div className="border-l-2 border-orange-500 pl-4 py-1">
                  <span className="block text-xs font-semibold text-stone-900 font-display">Radical Cost Transparency</span>
                  <p className="text-xs text-stone-500 mt-0.5">Ditch complex agency commissions. Our calculator outputs the precise print cost and delivery time, itemized down to the penny.</p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                  <span className="block text-xs font-semibold text-stone-900 font-display">Unconditionally Recyclable Stocks</span>
                  <p className="text-xs text-stone-500 mt-0.5">All printed volumes conform to FSC-certified eco-forestry and non-toxic soy inks.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Cards Row (Joyful Interactive metric chips) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {stats.map((st) => (
            <div
              key={st.id}
              className={`p-8 rounded-2xl border text-center transition-all hover:scale-[1.02] duration-300 shadow-xs hover:shadow-md ${st.color}`}
            >
              <span className="block text-4xl lg:text-5xl font-extrabold font-display tracking-tight">
                {st.value}
              </span>
              <span className="block text-base font-semibold text-stone-900 mt-2">
                {st.label}
              </span>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Joyful Team Grid */}
        <div id="team-grid-section" className="border-t border-stone-200/80 pt-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full inline-block">
              Meet The Guild
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-4">
              Our Typesetters & Cover Alchemists
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              Hover over our core team members to reveal their secret literary obsession!
            </p>
          </div>

          {/* Members list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => {
              const isHovered = activeFave === member.id;
              
              // Get initials for profile picture
              const initials = member.name.split(' ').map(n => n[0]).join('');

              return (
                <div
                  key={member.id}
                  id={`team-member-${member.id}`}
                  onMouseEnter={() => setActiveFave(member.id)}
                  onMouseLeave={() => setActiveFave(null)}
                  className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-indigo-600/30 transition-all shadow-3xs hover:shadow-md relative overflow-hidden text-center flex flex-col items-center justify-between"
                >
                  <div className="w-full">
                    {/* Circle initials representation */}
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center font-display text-xl font-bold border shadow-3xs ${member.avatarColor} mb-4 relative`}>
                      <span>{initials}</span>
                      <div className="absolute -bottom-1.5 -right-1.5 bg-white p-1 rounded-full border border-stone-100">
                        <Linkedin className="h-3.5 w-3.5 text-stone-500 hover:text-indigo-600 cursor-pointer" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 font-display">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 mt-1 uppercase font-mono tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-xs text-stone-500 mt-3 leading-relaxed px-1">
                      {member.bio}
                    </p>
                  </div>

                  {/* Secret details reveal under layout */}
                  <div className="mt-5 w-full pt-4 border-t border-stone-100">
                    {isHovered ? (
                      <div className="bg-indigo-50/70 py-1.5 px-3 rounded-lg border border-indigo-100/50 animate-fade-in">
                        <span className="block text-[8px] font-mono font-bold text-indigo-700 uppercase tracking-widest">Secret literary obsession:</span>
                        <p className="text-[10px] font-medium text-stone-700 leading-tight mt-0.5">
                          {faveGenres[member.id]}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-mono font-medium block py-2">
                        💡 Hover for bio secret
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Callout support */}
          <div className="mt-12 bg-indigo-50/40 border border-indigo-100 rounded-xl p-5 inline-flex items-center gap-3 max-w-2xl text-left">
            <UserPlus className="h-5 w-5 text-indigo-600 justify-start shrink-0" />
            <p className="text-xs text-stone-600">
              <b>Want to grow with us?</b> We are actively hiring a <b>Lead Rust Systems Developer</b> to integrate distributed printing nodes and a <b>Global Rights & Contracts Assistant</b>. Contact support for job info.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
