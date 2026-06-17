/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, ArrowRight, Loader2, Check } from 'lucide-react';

interface AuthSectionProps {
  onLoginSuccess: (email: string, name: string) => void;
}

export default function AuthSection({ onLoginSuccess }: AuthSectionProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Simulating beautiful google icon vector rather than complex external assets
  const GoogleIcon = () => (
    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field Checkers
    if (isSignUp && !name.trim()) {
      setErrorMsg('Please specify your legal Author/Pen name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid author e-mail address.');
      return;
    }
    if (isSignUp && !mobile.trim()) {
      setErrorMsg('A mobile dispatch number is required for shipping tracking reports.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Your security password must consist of at least 6 characters.');
      return;
    }

    triggerMockAuth(email, name || 'Indie Author');
  };

  const handleGoogleAuth = () => {
    setErrorMsg('');
    triggerMockAuth('google.author@mbpublisher.com', 'Google Alchemist');
  };

  const triggerMockAuth = (chosenEmail: string, chosenName: string) => {
    setIsLoading(true);
    
    // Simulate beautiful server response
    setTimeout(() => {
      setIsLoading(false);
      setIsDone(true);
      
      // Secondary brief success timeout to trigger parent route hook
      setTimeout(() => {
        onLoginSuccess(chosenEmail, chosenName);
      }, 700);
    }, 1200);
  };

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-stone-50 to-stone-100/50 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full px-4 sm:px-6">
        
        {/* Card housing */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle colored mesh details */}
          <div className="absolute top-0 left-0 w-full h-[5px] bg-linear-to-r from-indigo-500 via-purple-500 to-orange-400"></div>
          
          <div className="text-center mb-8">
            <div className="inline-flex p-2.5 bg-indigo-50/70 border border-indigo-100 text-indigo-600 rounded-xl mb-4 text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="h-4 w-4 mr-1 text-indigo-500" />
              <span>Notion-Style Access Port</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900 tracking-tight leading-tight">
              {isSignUp ? 'Create your Creator Studio' : 'Enter Author Dashboard'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              {isSignUp 
                ? 'Join 1,200+ indie novelists and academic presses publishing daily.' 
                : 'Welcome back! Sync your manuscript files and check distribution metrics.'
              }
            </p>
          </div>

          {/* Form UI */}
          {isDone ? (
            <div className="py-8 text-center flex flex-col items-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold font-display text-stone-900">Identity Authenticated!</h4>
              <p className="text-xs text-stone-500 mt-1">Routing you to MB Publisher Console...</p>
              <Loader2 className="h-4 w-4 text-indigo-600 animate-spin mt-4" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Optional Name Field */}
              {isSignUp && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider font-mono text-stone-600">
                    Author / Pen Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Vance"
                      className="w-full pl-9 pr-3.5 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 text-stone-900 placeholder:text-stone-400"
                      id="auth-name-input"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider font-mono text-stone-600">
                  Author Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. elena@publish.com"
                    className="w-full pl-9 pr-3.5 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 text-stone-900 placeholder:text-stone-400"
                    id="auth-email-input"
                  />
                </div>
              </div>

              {/* Optional Mobile Field for tracking updates */}
              {isSignUp && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider font-mono text-stone-600">
                    Mobile Dispatch Contact
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-9 pr-3.5 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 text-stone-900 placeholder:text-stone-400"
                      id="auth-mobile-input"
                    />
                  </div>
                </div>
              )}

              {/* Form Security Password */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider font-mono text-stone-600">
                    Security Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      className="text-[10px] font-mono text-indigo-600 hover:underline hover:text-indigo-700 pointer-events-auto"
                      onClick={() => alert("Simulating verification code sent to e-mail.")}
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter 6+ characters"
                    className="w-full pl-9 pr-10 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 text-stone-900 placeholder:text-stone-400"
                    id="auth-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error messages block */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 text-xs font-semibold text-red-600 rounded-lg text-left">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Action Buttons */}
              <button
                type="submit"
                disabled={isLoading}
                id="auth-submit-btn"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-stone-50" />
                    <span>Configuring keys...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Author Space' : 'Access Dashboards'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Divider lines */}
              <div className="relative my-6 flex items-center">
                <div className="grow border-t border-stone-200"></div>
                <span className="shrink mx-3 text-[10px] font-mono whitespace-nowrap uppercase tracking-widest text-stone-400 font-bold bg-white px-2">
                  OR CONTINUE WITH
                </span>
                <div className="grow border-t border-stone-200"></div>
              </div>

              {/* Google OAuth Click representation */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                id="google-oauth-btn"
                className="w-full py-3 border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold rounded-xl text-xs flex items-center justify-center hover:border-stone-300 transition-colors cursor-pointer"
              >
                <GoogleIcon />
                <span>Continue with Google Account</span>
              </button>

            </form>
          )}

          {/* Toggle Footers */}
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-xs text-stone-500 font-sans">
              {isSignUp ? 'Already own a publisher desk?' : 'Brand new to our platform?'}
              {' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                }}
                className="text-xs font-bold text-[#4F46E5] hover:underline"
                id="auth-toggle-view-btn"
              >
                {isSignUp ? 'Log in here' : 'Register pen name'}
              </button>
            </p>
          </div>

        </div>

        {/* Floating Privacy Label */}
        <p className="text-[10px] text-stone-400 font-mono mt-4 text-center">
          Lock-solid SSL Encryption. We strictly respect author digital rights. Read our GDRP, CCPA, and copyright manifest.
        </p>

      </div>
    </section>
  );
}
