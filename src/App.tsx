/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BentoFeatures from './components/BentoFeatures';
import ServicesSection from './components/ServicesSection';
import PricingCalculator from './components/PricingCalculator';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import AuthSection from './components/AuthSection';
import TestimonialsSlider from './components/TestimonialsSlider';
import Footer from './components/Footer';
import DashboardView from './components/DashboardView';
import ClientProposal from './components/ClientProposal';

import { Book } from './types';
import { INITIAL_BOOKS } from './data';

export default function App() {
  // Theme state with local persistence and system default fallback
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('pb_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Highlight / Brand accent color state
  const [brand, setBrand] = useState<string>(() => {
    const saved = localStorage.getItem('pb_brand');
    return saved || 'noir';
  });

  // Client-side authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');

  // Routing State
  const [currentView, setCurrentView] = useState<string>('home');

  // Book Database list state
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('pb_theme', theme);
  }, [theme]);

  // Sync brand changes with HTML data attribute and localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-brand', brand);
    localStorage.setItem('pb_brand', brand);
  }, [brand]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Load mock session storage login if any
  useEffect(() => {
    const cachedEmail = localStorage.getItem('pb_email');
    const cachedName = localStorage.getItem('pb_author_name');
    if (cachedEmail) {
      setUserEmail(cachedEmail);
      setAuthorName(cachedName || 'Indie Author');
      setIsLoggedIn(true);
    }
  }, []);

  // Handle successful login
  const handleLoginSuccess = (email: string, name: string) => {
    localStorage.setItem('pb_email', email);
    localStorage.setItem('pb_author_name', name);
    setUserEmail(email);
    setAuthorName(name);
    setIsLoggedIn(true);
    
    // Redirect direct to Author Dashboard
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('pb_email');
    localStorage.removeItem('pb_author_name');
    setIsLoggedIn(false);
    setUserEmail('');
    setAuthorName('');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add a newly submitted book metadata to state
  const handleAddBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col justify-between transition-colors duration-300" id="platform-app-root">
      
      {/* 1. Global Navigation header bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
        brand={brand}
        onBrandChange={setBrand}
      />

      {/* 2. Main content router */}
      <main className="grow">
        
        {/* VIEW: HOME LANDING PAGE (Hero + Bento + Testimonials + FAQs + Contacts) */}
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <HeroSection
              onPublishClick={() => {
                if (isLoggedIn) {
                  setCurrentView('dashboard');
                } else {
                  setCurrentView('auth');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPricingClick={() => {
                setCurrentView('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <BentoFeatures />
            <TestimonialsSlider />
            <FAQSection />
            <ContactSection />
          </div>
        )}

        {/* VIEW: SERVICES PAGE */}
        {currentView === 'services' && (
          <div className="animate-fade-in">
            <ServicesSection
              onSelectService={(serviceId) => {
                // If they want details, we scroll them down or alert specification package info
                alert(`Requested full specification layout guidelines and quotation package sheet for: "${serviceId.toUpperCase()}" selection!`);
              }}
              onPricingRedirect={() => {
                setCurrentView('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW: PRICING CALC PAGE */}
        {currentView === 'pricing' && (
          <div className="animate-fade-in">
            <PricingCalculator />
          </div>
        )}

        {/* VIEW: ABOUT US STORY PAGE */}
        {currentView === 'about' && (
          <div className="animate-fade-in">
            <AboutSection />
          </div>
        )}

        {/* VIEW: FAQ DIRECT VIEWER */}
        {currentView === 'faq' && (
          <div className="animate-fade-in">
            <FAQSection />
          </div>
        )}

        {/* VIEW: CONTACT SUPPORT HUB */}
        {currentView === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection />
          </div>
        )}

        {/* VIEW: CLIENT PROPOSAL PROTOCOL (Printable & Export PDF ready) */}
        {currentView === 'proposal' && (
          <div className="animate-fade-in">
            <ClientProposal />
          </div>
        )}

        {/* VIEW: AUTHOR REG/AUTH PAGES */}
        {currentView === 'auth' && (
          <div className="animate-fade-in">
            {isLoggedIn ? (
              // If already logged in, redirect straight away to dashboard
              <div className="py-24 text-center">
                <p className="text-sm font-semibold text-stone-500">Already logged in. Accessing Dashboard...</p>
                {setTimeout(() => setCurrentView('dashboard'), 200) && null}
              </div>
            ) : (
              <AuthSection onLoginSuccess={handleLoginSuccess} />
            )}
          </div>
        )}

        {/* VIEW: PRIVATE AUTHOR DASHBOARD CONSOLE (Requires Login) */}
        {currentView === 'dashboard' && (
          <div className="animate-fade-in">
            {isLoggedIn ? (
              <DashboardView
                books={books}
                onAddBook={handleAddBook}
                userEmail={userEmail}
              />
            ) : (
              // Safe access portal redirection
              <div className="py-16 text-center max-w-md mx-auto space-y-4">
                <p className="text-sm font-semibold text-red-500">⚠️ Access Required: Authentication credential files are missing.</p>
                <p className="text-xs text-stone-500">Please sign-up a pen name to gain entry inside your publishing controls dashboards.</p>
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-lg text-xs"
                >
                  Configure Identity here
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* 3. Global categorized footer (Hidden inside Private dashboards to keep clean view!) */}
      {currentView !== 'dashboard' && (
        <Footer onNavClick={(vId) => setCurrentView(vId)} />
      )}

    </div>
  );
}
