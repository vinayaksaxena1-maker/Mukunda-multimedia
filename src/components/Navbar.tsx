/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Menu, X, LogOut, User, LayoutDashboard, Compass, Sun, Moon, Palette } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  userEmail: string;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  brand: string;
  onBrandChange: (brand: string) => void;
}

export default function Navbar({
  currentView,
  setCurrentView,
  isLoggedIn,
  setIsLoggedIn,
  userEmail,
  onLogout,
  theme,
  onToggleTheme,
  brand,
  onBrandChange
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing Calculator' },
    { id: 'about', label: 'About Us' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact Support' },
    { id: 'proposal', label: 'Client Proposal' },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-stone-50/80 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-850 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group focus:outline-hidden"
              id="brand-logo-btn"
            >
              <div className="bg-indigo-600 p-2 rounded-xl text-stone-50 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 shadow-sm shadow-indigo-600/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block text-base font-bold font-display tracking-wide text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                  MB Publisher
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-${item.id}`}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 shadow-3xs shadow-indigo-100/10'
                      : 'text-stone-600 dark:text-stone-450 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-100/50 dark:hover:bg-stone-900/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Side Control Panel */}
          <div className="hidden md:flex items-center space-x-3.5">
            {/* Theme brand selection widget */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
              <Palette className="h-4 w-4 text-stone-400 mr-1" />
              {[
                { name: 'noir', color: 'bg-black border border-stone-300 dark:border-stone-700', nameLabel: 'Noir' },
                { name: 'indigo', color: 'bg-indigo-500', nameLabel: 'Indigo' },
                { name: 'emerald', color: 'bg-emerald-500', nameLabel: 'Emerald' },
                { name: 'violet', color: 'bg-violet-500', nameLabel: 'Violet' },
                { name: 'rose', color: 'bg-rose-500', nameLabel: 'Rose' },
                { name: 'amber', color: 'bg-amber-500', nameLabel: 'Amber' },
                { name: 'blue', color: 'bg-blue-500', nameLabel: 'Blue' },
              ].map((b) => (
                <button
                  key={b.name}
                  onClick={() => onBrandChange(b.name)}
                  className={`w-3.5 h-3.5 rounded-full ${b.color} cursor-pointer transition-all hover:scale-120 hover:shadow-xs active:scale-95 ${
                    brand === b.name
                      ? 'ring-2 ring-offset-1 ring-stone-900 dark:ring-stone-100 scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={`Change accent colour to ${b.nameLabel}`}
                  aria-label={`Change accent colour to ${b.nameLabel}`}
                />
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-stone-100/50 dark:hover:bg-stone-850 transition-all cursor-pointer focus:outline-hidden"
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-4.5 w-4.5" />
              ) : (
                <Sun className="h-4.5 w-4.5 text-amber-500 animate-[spin_5s_linear_infinite]" />
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-go-dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                    currentView === 'dashboard'
                      ? 'bg-indigo-600 border-indigo-600 text-stone-50 shadow-md shadow-indigo-600/10'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-950'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <div className="h-8 w-px bg-stone-200"></div>
                <div className="flex items-center gap-1.5 bg-stone-200/50 px-2.5 py-1.5 rounded-lg border border-stone-200">
                  <User className="h-3.5 w-3.5 text-stone-500" />
                  <span className="text-xs font-mono text-stone-600 max-w-[100px] truncate">
                    {userEmail.split('@')[0]}
                  </span>
                </div>
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-sign-in"
                  onClick={() => handleNavClick('auth')}
                  className="px-3.5 py-2 text-sm font-semibold text-stone-700 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  id="nav-get-started"
                  onClick={() => handleNavClick('auth')}
                  className="px-4.5 py-2 text-sm font-semibold text-stone-50 bg-indigo-600 hover:bg-indigo-700 transition-all rounded-lg cursor-pointer shadow-sm shadow-indigo-600/10"
                >
                  Start Printing
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {/* Mobile Theme Toggle Button */}
            <button
              id="theme-toggle-btn-mobile"
              onClick={onToggleTheme}
              className="p-2 mr-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-stone-100/50 dark:hover:bg-stone-850 transition-all cursor-pointer focus:outline-hidden"
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-4.5 w-4.5" />
              ) : (
                <Sun className="h-4.5 w-4.5 text-amber-500" />
              )}
            </button>

            {isLoggedIn && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="p-1 px-2.5 py-1.5 mr-2 rounded-lg text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold flex items-center gap-1"
                id="mobile-mini-dashboard"
              >
                <Compass className="h-3 w-3" />
                Dashboard
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-850 bg-stone-50 dark:bg-stone-900 animate-fade-in/80 transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            {/* Mobile Theme Selection */}
            <div className="px-4 py-3 border-t border-stone-200/60 dark:border-stone-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-stone-450" /> Accent Colour
              </span>
              <div className="flex items-center gap-2">
                {[
                  { name: 'noir', color: 'bg-black border border-stone-300 dark:border-stone-700' },
                  { name: 'indigo', color: 'bg-indigo-500' },
                  { name: 'emerald', color: 'bg-emerald-500' },
                  { name: 'violet', color: 'bg-violet-500' },
                  { name: 'rose', color: 'bg-rose-500' },
                  { name: 'amber', color: 'bg-amber-500' },
                  { name: 'blue', color: 'bg-blue-500' },
                ].map((b) => (
                  <button
                    key={b.name}
                    onClick={() => onBrandChange(b.name)}
                    className={`w-4 h-4 rounded-full ${b.color} cursor-pointer transition-all ${
                      brand === b.name
                        ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-stone-100 scale-110'
                        : 'opacity-75'
                    }`}
                    title={`Change accent to ${b.name}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-4 pb-2 border-t border-stone-200/60 dark:border-stone-800 px-4">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      Logged in as: <b className="text-stone-800 dark:text-stone-200">{userEmail}</b>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-stone-50 shadow-xs"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleNavClick('auth')}
                    className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavClick('auth')}
                    className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-stone-50"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
