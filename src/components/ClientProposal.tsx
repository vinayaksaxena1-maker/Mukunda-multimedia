import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Briefcase, 
  Layers, 
  Settings, 
  Globe, 
  DollarSign, 
  CheckCircle, 
  Calendar, 
  Code2, 
  Server, 
  User, 
  ShieldCheck,
  BookOpen,
  Sliders,
  Cpu,
  FileText
} from 'lucide-react';

export default function ClientProposal() {
  // Proposal customization state - lets the user tailor it for their client!
  const [clientName, setClientName] = useState('Mukunda Multimedia Partner');
  const [companyName, setCompanyName] = useState('Independent Creators Network');
  const [creationDate, setCreationDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });
  const [projectBudget, setProjectBudget] = useState('₹4,50,000 INR (Estimated)');
  const [timeline, setTimeline] = useState('4 - 6 Weeks');
  const [projectStatus, setProjectStatus] = useState('Ready for Deployment');
  
  // Interactive preview mode toggles
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(true);
  const [showModulesDetail, setShowModulesDetail] = useState(true);

  // Trigger standard professional browser print dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Dynamic Editing Panel - Explicitly Hidden in Print View */}
      <div className="mb-8 p-6 bg-indigo-50/70 dark:bg-stone-900 border border-indigo-100 dark:border-stone-800 rounded-2xl shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-100/50 dark:border-stone-800 pb-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2 font-display">
              <Sliders className="h-5 w-5 text-indigo-600" />
              Tweak Proposal Presentation
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Customize these details live to align with your client's brand. The downloaded PDF will automatically update!
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all text-xs"
          >
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 grayscale opacity-80">
              Client Contact Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:border-indigo-500 focus:outline-hidden text-stone-900 dark:text-stone-100"
              placeholder="e.g. Mukunda Proprietor"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 grayscale opacity-80">
              Company / Client Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:border-indigo-500 focus:outline-hidden text-stone-900 dark:text-stone-100"
              placeholder="e.g. Mukunda Multimedia"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 grayscale opacity-80">
              Proposal Date
            </label>
            <input
              type="text"
              value={creationDate}
              onChange={(e) => setCreationDate(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:border-indigo-500 focus:outline-hidden text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 grayscale opacity-80">
              Budget Estimate
            </label>
            <input
              type="text"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:border-indigo-500 focus:outline-hidden text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 grayscale opacity-80">
              Delivery Timeline
            </label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:border-indigo-500 focus:outline-hidden text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 grayscale opacity-80">
              Project Phase / Status
            </label>
            <select
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:border-indigo-500 focus:outline-hidden text-stone-900 dark:text-stone-100"
            >
              <option value="Ready for Deployment">Ready for Deployment</option>
              <option value="Active Development Phase">Active Development Phase</option>
              <option value="Proposal Stage">Proposal Stage</option>
              <option value="V2 Feature Upgrade">V2 Feature Upgrade</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-indigo-100/30 dark:border-stone-800/40">
          <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-305 cursor-pointer">
            <input
              type="checkbox"
              checked={showModulesDetail}
              onChange={(e) => setShowModulesDetail(e.target.checked)}
              className="rounded-sm border-stone-300 text-indigo-600 focus:ring-indigo-500"
            />
            Show Detailed Module Breakdowns
          </label>
          <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-305 cursor-pointer">
            <input
              type="checkbox"
              checked={showTechnicalSpecs}
              onChange={(e) => setShowTechnicalSpecs(e.target.checked)}
              className="rounded-sm border-stone-300 text-indigo-600 focus:ring-indigo-500"
            />
            Show Complete Technical Architecture
          </label>
        </div>
      </div>

      {/* ==================== THE PRINTABLE PROPOSAL SECTION ==================== */}
      <div 
        id="proposal-document" 
        className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800/70 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden print:border-0 print:shadow-none print:p-0"
      >
        {/* Subtle printable-only watermarking */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-indigo-600" />
        
        {/* Document Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-stone-200 dark:border-stone-800 pb-8">
          <div className="flex items-center gap-3.5">
            <div className="bg-indigo-600 p-3 rounded-2xl text-stone-50 print:bg-stone-950">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-stone-950 dark:text-stone-50">
                MB Publisher
              </h1>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 font-mono">
                Software Blueprint & Proposal
              </span>
            </div>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-stone-600 dark:text-stone-400">
            <p><strong>Document ID:</strong> MBP-2026-MKM</p>
            <p className="mt-0.5"><strong>Date:</strong> {creationDate}</p>
            <p className="mt-0.5"><strong>Status:</strong> <span className="font-bold text-indigo-600 dark:text-indigo-400">{projectStatus}</span></p>
          </div>
        </div>

        {/* Corporate / Metadata Grid Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b border-stone-100 dark:border-stone-800/50 bg-stone-50/50 dark:bg-stone-900/30 rounded-2xl px-6 my-6">
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 font-mono">
              Prepared For
            </span>
            <span className="block text-sm font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              {clientName}
            </span>
            <span className="block text-xs text-stone-500 dark:text-stone-400">
              {companyName}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 font-mono">
              Prepared By
            </span>
            <span className="block text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
              Development Team
            </span>
            <span className="block text-xs text-stone-500 dark:text-stone-400">
              Full Stack Solutions
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 font-mono">
              Budget Projection
            </span>
            <span className="block text-sm font-extrabold text-stone-900 dark:text-stone-100 mt-1 flex items-center gap-1">
              <DollarSign className="h-4.5 w-4.5 text-stone-400 shrink-0" />
              {projectBudget}
            </span>
            <span className="block text-xs text-stone-500 dark:text-stone-400">
              Fixed milestones scale
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500 font-mono">
              Estimated Timeline
            </span>
            <span className="block text-sm font-extrabold text-stone-900 dark:text-stone-100 mt-1 flex items-center gap-1">
              <Calendar className="h-4.5 w-4.5 text-stone-400 shrink-0" />
              {timeline}
            </span>
            <span className="block text-xs text-stone-500 dark:text-stone-400">
              With full quality assurance
            </span>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 border-l-4 border-indigo-600 pl-3">
            1. Executive Summary
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            <strong>MB Publisher (with full deployment support for Mukunda Multimedia)</strong> is a cutting-edge, ultra-interactive Book Self-Publishing and Digital Distribution Software. Designed explicitly to empower independent creators, educational cells, and boutique novelists, this custom full-stack software takes book ideas and raw manuscripts, formats them to pixel-perfect paperback layouts, calculates structural details, and provides integrated financial mechanisms—all inside a modern, blazing-fast web infrastructure.
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            The platform provides a highly automated, self-contained workspace where authors register pen names, track publishing pipelines through discrete operational stages, and simulate real-time Amazon Prime & Barnes & Noble royalties auditing. The entire suite of features is cohesive, responsive across mobile & desktop devices, and delivers an premium, intuitive user experience.
          </p>
        </div>

        {/* Section 2: Core Platform Modules */}
        {showModulesDetail && (
          <div className="space-y-6 mb-8 page-break-before">
            <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 border-l-4 border-indigo-600 pl-3">
              2. Implemented Platform Modules
            </h2>
            <p className="text-sm text-stone-550 dark:text-stone-400 mb-2">
              The application translates complex publishing business logic into direct, simple, single-view states:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Module 1: Interactive Landings */}
              <div className="p-5 border border-stone-150 dark:border-stone-800 rounded-2xl bg-stone-50/40 dark:bg-stone-900/40">
                <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg text-xs font-mono font-bold">01</span>
                  Brand Identity & Exploration Suite
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-355">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>High-Impact Hero:</strong> Call-to-actions pointing with smooth scrolls directly to custom formats.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Bento Grid Layout:</strong> Elegant highlight grid showcasing publishing capabilities with custom hover animations.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Searchable FAQ Section:</strong> Instantly filter common licensing, bleed format, and distribution questions in real-time.</span>
                  </li>
                </ul>
              </div>

              {/* Module 2: Pricing Calculator */}
              <div className="p-5 border border-stone-150 dark:border-stone-800 rounded-2xl bg-stone-50/40 dark:bg-stone-900/40">
                <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg text-xs font-mono font-bold">02</span>
                  Parametric Instant Quote Calculator
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-355">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Real-time Math Engine:</strong> Choose custom page counts (from 24 to 800), softcover/hardcover, and copy volumes.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Premium Options:</strong> Add cream paper, premium ink coatings, and global wholesale expanded distributions.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Direct Feedback:</strong> Interactive sliders updating production costs, retail margins, and estimated royalty cuts per copy.</span>
                  </li>
                </ul>
              </div>

              {/* Module 3: Author Dashboard */}
              <div className="p-5 border border-stone-150 dark:border-stone-800 rounded-2xl bg-stone-50/40 dark:bg-stone-900/40">
                <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg text-xs font-mono font-bold">03</span>
                  Author Console & Manuscript Typesetter
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-355">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Live Spine Calculator:</strong> Real-time spine thickness calculation in millimeters based on paper weight and trim size.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Integrated Step-by-Step Tracker:</strong> Active stages (Manuscript Upload, Cover Layout Approved, Distribution Sync, Live Retail Product).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Mock Blueprint Canvas:</strong> Beautiful responsive mock layouts generated on high-definition press schemas if no real manuscript is submitted.</span>
                  </li>
                </ul>
              </div>

              {/* Module 4: Royalties & Capital Ledger */}
              <div className="p-5 border border-stone-150 dark:border-stone-800 rounded-2xl bg-stone-50/40 dark:bg-stone-900/40">
                <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg text-xs font-mono font-bold">04</span>
                  Royalties Auditing & Cashout Gate
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-355">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Live Sales Telemetry:</strong> Keep detailed records of outstanding royalties generated across book lines.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Direct Bank Cashout Simulator:</strong> Verify account, input IFSC bank details, and simulate electronic IMPS/NEFT fund transfers instantly.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Audit Logs History:</strong> Real-time interactive tables tracking completed payout disbursements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Technical Specifications */}
        {showTechnicalSpecs && (
          <div className="space-y-6 mb-8 page-break-before">
            <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 border-l-4 border-indigo-600 pl-3">
              3. Full Stack Architecture Spec
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 border border-stone-150 dark:border-stone-800/80 rounded-xl bg-stone-50/30">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold mb-1.5">
                  <Code2 className="h-4.5 w-4.5" />
                  <span>FRONTEND SPEC</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  - React 19 Engine<br />
                  - Tailwind CSS v4 Utilities<br />
                  - Vite Hot Bundler<br />
                  - TypeScript Compilation<br />
                  - Lucide Graphics Assets<br />
                  - Motion Micro-interactions
                </p>
              </div>

              <div className="p-4 border border-stone-150 dark:border-stone-800/80 rounded-xl bg-stone-50/30">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold mb-1.5">
                  <Server className="h-4.5 w-4.5" />
                  <span>BACKEND ENGINE</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  - Node.js Runtime Server<br />
                  - Express.js JSON Endpoint routes<br />
                  - Vite Static Asset Middleware<br />
                  - Port 3000 Ingress Bindings<br />
                  - esbuild Bundle compiler<br />
                  - CJS Output Format targets
                </p>
              </div>

              <div className="p-4 border border-stone-150 dark:border-stone-800/80 rounded-xl bg-stone-50/30">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold mb-1.5">
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span>SECURITY & STATE</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  - Encrypted client State Engine<br />
                  - LocalStorage Access persistence<br />
                  - Environment File variable guides<br />
                  - Strict linted schemas<br />
                  - Cross-origin isolation layers<br />
                  - Flexible custom brand hooks
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Implementation Roadmap & Milestones */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 border-l-4 border-indigo-600 pl-3">
            4. Execution Plan & Deployment Process
          </h2>
          <div className="space-y-3 font-mono text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-3">
              <span className="w-16 text-right font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900">PHASE 1</span>
              <span><strong>Design Blueprinting:</strong> Formulated custom interactive calculators & pricing specs. <span className="text-emerald-600">✓ Done</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-right font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900">PHASE 2</span>
              <span><strong>Authors Space Setup:</strong> Programmed multi-item manuscript analyzers. <span className="text-emerald-600">✓ Done</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-right font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900">PHASE 3</span>
              <span><strong>Bank Transfer Systems:</strong> Linked direct online cashout interfaces. <span className="text-emerald-600">✓ Done</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-right font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900">PHASE 4</span>
              <span><strong>Full Production Build:</strong> Configured Express.js server & Bundlers. <span className="text-emerald-600">✓ Done</span></span>
            </div>
          </div>
        </div>

        {/* Footer info blocks for proposal */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-[11px] text-stone-400 dark:text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} MB Publisher Platform. All rights reserved.</p>
          <p className="font-mono text-[9px] uppercase tracking-wider">🔒 CONFIDENTIAL DESIGN BLUEPRINT & PROPOSAL</p>
        </div>
      </div>

      {/* Styled Printable Setup Controls inside our proposal page */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          /* Hide non-printable items */
          #brand-logo-btn, #theme-toggle-btn, nav, footer, .print\\:hidden, #platform-app-root > nav, #platform-app-root > footer {
            display: none !important;
          }
          #proposal-document {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .page-break-before {
            page-break-before: always;
          }
        }
      `}</style>
    </div>
  );
}
