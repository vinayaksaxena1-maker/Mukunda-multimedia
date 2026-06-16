/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, UploadCloud, Compass, DollarSign, MessageSquare, 
  User, ChevronRight, Check, ArrowRight, Save, Play, Plus, BookCheck, 
  TrendingUp, Download, Eye, AlertCircle, FileText, Send, Phone, UserCheck 
} from 'lucide-react';
import { Book, Message } from '../types';

interface DashboardViewProps {
  books: Book[];
  onAddBook: (newBook: Book) => void;
  userEmail: string;
}

export default function DashboardView({ books, onAddBook, userEmail }: DashboardViewProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>('overview');

  // Interactive Book selection for tracking
  const [selectedTrackingBookId, setSelectedTrackingBookId] = useState<string>(books[0]?.id || '');
  const activeTrackBook = books.find(b => b.id === selectedTrackingBookId) || books[0];

  // Book Upload System wizard state
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [upTitle, setUpTitle] = useState<string>('');
  const [upAuthor, setUpAuthor] = useState<string>('');
  const [upCategory, setUpCategory] = useState<string>('Literary Fiction');
  const [upLanguage, setUpLanguage] = useState<string>('English');
  const [upDescription, setUpDescription] = useState<string>('');
  
  // File Upload states
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('');
  const [pdfFileSize, setPdfFileSize] = useState<string>('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverFileName, setCoverFileName] = useState<string>('');
  const [isDraggingPdf, setIsDraggingPdf] = useState(false);
  const [isDraggingCover, setIsDraggingCover] = useState(false);

  // Print defaults in wizard Step 3
  const [upPages, setUpPages] = useState<number>(160);
  const [upSize, setUpSize] = useState<'A5' | 'A4' | '6x9' | '5.5x8.5'>('A5');
  const [upColor, setUpColor] = useState<'bw' | 'color'>('bw');
  const [upFormat, setUpFormat] = useState<'paperback' | 'hardcover'>('paperback');
  const [upQty, setUpQty] = useState<number>(15);

  // Messages Chat state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: '1', sender: 'assistant', text: "Hello Author! I am Elena from the typesetting desk. I saw your historical fiction drafts. Feel free to ask about custom covers or spine bleed margins direct!", timestamp: "12:14 PM" },
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  // Cashout parameters simulation
  const [cashoutAmount, setCashoutAmount] = useState<string>('120');
  const [cashStatus, setCashStatus] = useState<string>('');

  // Sidebar navigation options
  const menuItems = [
    { id: 'overview', label: 'Overview Panel', icon: <LayoutDashboard className="h-4.5 w-4.5" /> },
    { id: 'books', label: 'My Bookshelf', icon: <BookOpen className="h-4.5 w-4.5" /> },
    { id: 'upload', label: 'Printing Wizard', icon: <UploadCloud className="h-4.5 w-4.5" /> },
    { id: 'tracking', label: 'Track Shipments', icon: <Compass className="h-4.5 w-4.5" /> },
    { id: 'earnings', label: 'Royalties audit', icon: <DollarSign className="h-4.5 w-4.5" /> },
    { id: 'messages', label: 'Inbound chat', icon: <MessageSquare className="h-4.5 w-4.5" /> },
  ];

  // Helper random cover generators
  const coverBgPresets = [
    'bg-indigo-700', 'bg-emerald-700', 'bg-amber-600', 
    'bg-rose-700', 'bg-purple-800', 'bg-sky-700'
  ];

  // Drag and drop handlers
  const handleDragPdf = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPdf(true);
  };
  const handleDropPdf = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPdf(false);
    if(e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setPdfFile(file);
      setPdfFileName(file.name);
      setPdfFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
    }
  };

  const handleDragCover = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingCover(true);
  };
  const handleDropCover = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingCover(false);
    if(e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setCoverFile(file);
      setCoverFileName(file.name);
    }
  };

  const handleManuscriptSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFile(file);
      setPdfFileName(file.name);
      setPdfFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverFileName(file.name);
    }
  };

  // Submit book from wizard Step 3
  const handleWizardSubmit = (statusType: 'under_review' | 'draft') => {
    if (!upTitle.trim()) {
      alert("Please configure a book Title before saving.");
      return;
    }

    const randomColor = coverBgPresets[Math.floor(Math.random() * coverBgPresets.length)];
    const bookId = "B-" + Math.floor(105 + Math.random() * 800);

    const newBook: Book = {
      id: bookId,
      title: upTitle,
      author: upAuthor || "Indie Author",
      category: upCategory,
      language: upLanguage,
      description: upDescription || "No custom synopsis provided.",
      coverColor: randomColor,
      manuscriptName: pdfFileName || "mock_manuscript.pdf",
      pages: upPages,
      size: upSize,
      colorType: upColor,
      printFormat: upFormat,
      quantity: upQty,
      status: statusType,
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pricePaid: upQty * 3.45 // Estimate
    };

    onAddBook(newBook);
    
    // Reset wizard variables
    setUpTitle('');
    setUpAuthor('');
    setUpDescription('');
    setPdfFile(null);
    setPdfFileName('');
    setCoverFile(null);
    setCoverFileName('');
    setWizardStep(1);

    // Prompt Success
    alert(`Success! Book "${newBook.title}" registered with ID: ${newBook.id}. Current status is: "${statusType === 'under_review' ? 'Under Review' : 'Draft'}"`);
    
    // Navigate to books tab
    setActiveSidebarTab('books');
    setSelectedTrackingBookId(bookId);
  };

  // Chat message sending simulation
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: Message = {
      id: String(chatMessages.length + 1),
      sender: 'author',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Trigger AI support responses based on keyword hooks
    setTimeout(() => {
      let botResponse = "Our automated pre-flight layout scanner is verifying your manuscript gutters. This normally completes in 15 seconds!";
      
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('isbn') || lower.includes('barcode')) {
        botResponse = "Under our publishing bundle, PageBound automatically buys and registers your ISBN package profile under GS1 guidelines. No physical card is required.";
      } else if (lower.includes('bleed') || lower.includes('margin') || lower.includes('gutter')) {
        botResponse = "For A5 books, keep safe printable text margins at 12.5mm and add 3.175mm layout bleed margins on all three outer trim segments.";
      } else if (lower.includes('hardcover') || lower.includes('paperback')) {
        botResponse = "Paperbacks use EVA hot-melt glues with 280gsm stocks, whereas Hardcovers use premium archival sewing bound directly onto 2.0mm dense greyboard wraps.";
      }

      const botMsg: Message = {
        id: String(chatMessages.length + 2),
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  // Cashout withdrawal simulator
  const handleCashout = (e: React.FormEvent) => {
    e.preventDefault();
    const withdraw = Number(cashoutAmount);
    if(isNaN(withdraw) || withdraw <= 0 || withdraw > 450) {
      setCashStatus("⚠️ Error: Insufficient outstanding sales check balance.");
      return;
    }

    setCashStatus("⌛ Parsing transactional dispatch on IMPS/NEFT nodes...");
    setTimeout(() => {
      setCashStatus(`✅ Success! Cashout check of $${withdraw} approved and dispatched to bank. Normal clearance is 24 hours.`);
      setCashoutAmount('');
    }, 1200);
  };

  // Computed totals for stats cards
  const totalBooksCount = books.length;
  const draftBooksCount = books.filter(b => b.status === 'draft').length;
  const activeReviewBooksCount = books.filter(b => b.status === 'under_review' || b.status === 'approved').length;
  const totalCopiesCount = books.reduce((sum, b) => sum + (b.status !== 'draft' ? b.quantity : 0), 0);
  const totalAuthorEarnings = books.reduce((sum, b) => sum + (b.status === 'shipped' || b.status === 'delivered' ? (b.quantity * 2.80) : 0), 245.00);

  // Mapped Horizontal Order Progress State indicators
  const trackingStages = [
    { id: 'under_review', label: 'Under Review', desc: 'Pre-flight file checking' },
    { id: 'approved', label: 'Approved', desc: 'Typeset proof sheet passed' },
    { id: 'printing', label: 'Printing Block', desc: 'Active press gluing blocks' },
    { id: 'shipped', label: 'Shipped', desc: 'Handed over to carrier network' },
    { id: 'delivered', label: 'Delivered', desc: 'Arrived at author doorstep' },
  ];

  // Get active step index for Order tracking
  const activeStageIdx = trackingStages.findIndex(s => s.id === (activeTrackBook?.status || 'under_review'));

  return (
    <section className="bg-stone-50 border-t border-stone-200 min-h-[85vh] flex flex-col md:flex-row text-left">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-stone-200/80 shrink-0 p-4">
        
        {/* User Card */}
        <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-xl mb-6 border border-stone-200">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-stone-50 flex items-center justify-center font-bold font-display text-xs">
            {userEmail[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="block text-xs text-stone-400 font-mono tracking-wider font-semibold">Logged-in Author</span>
            <p className="text-xs font-bold text-stone-900 truncate">{userEmail}</p>
          </div>
        </div>

        {/* Navigation Menus */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeSidebarTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSidebarTab(item.id)}
                id={`sidebar-tab-${item.id}`}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-3xs border-r-3 border-indigo-600' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="grow p-6 sm:p-8 space-y-6 overflow-hidden md:max-w-[calc(100vw-256px)]">
        
        {/* ================= VIEW: OVERVIEW PANEL ================= */}
        {activeSidebarTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header block */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <h2 className="text-2xl font-bold font-display text-stone-950">Author Workspace Console</h2>
                <p className="text-xs text-stone-500 mt-1">Audit active printed counts, file upload states, and royalty checks live.</p>
              </div>
              <button
                id="overview-launch-wizard"
                onClick={() => setActiveSidebarTab('upload')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-stone-50 rounded-lg transition-transform hover:scale-[1.02] shadow-xs cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Publish New manuscript</span>
              </button>
            </div>

            {/* Metric grid columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="p-5.5 bg-white border border-stone-200 rounded-2xl shadow-3xs text-left">
                <span className="block text-xs font-extrabold font-mono text-stone-400 uppercase tracking-widest">Active bookshelf</span>
                <span className="block text-2xl font-extrabold font-display text-stone-900 mt-1.5">{totalBooksCount} specs</span>
                <p className="text-xs text-[#4F46E5] font-semibold mt-1">({draftBooksCount} Drafts · {activeReviewBooksCount} Reviews)</p>
              </div>

              <div className="p-5.5 bg-white border border-stone-200 rounded-2xl shadow-3xs text-left">
                <span className="block text-xs font-extrabold font-mono text-stone-400 uppercase tracking-widest">Printed copies</span>
                <span className="block text-2xl font-extrabold font-display text-stone-900 mt-1.5">{totalCopiesCount.toLocaleString()} units</span>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Total physical orders</p>
              </div>

              <div className="p-5.5 bg-white border border-stone-200 rounded-2xl shadow-3xs text-left">
                <span className="block text-xs font-extrabold font-mono text-[#D97706] uppercase tracking-widest">Gross Royalties</span>
                <span className="block text-2xl font-extrabold font-display text-stone-900 mt-1.5">${totalAuthorEarnings.toFixed(2)}</span>
                <p className="text-xs text-stone-500 mt-1">Payout balance ready</p>
              </div>

              <div className="p-5.5 bg-white border border-stone-200 rounded-2xl shadow-3xs text-left">
                <span className="block text-xs font-extrabold font-mono text-stone-400 uppercase tracking-widest">System inbox</span>
                <span className="block text-2xl font-extrabold font-display text-indigo-600 mt-1.5">No issues</span>
                <p className="text-xs text-stone-500 mt-0.5 font-sans font-light">Typeset desk connected</p>
              </div>

            </div>

            {/* Quick tracker preview strip */}
            {activeTrackBook && (
              <div className="p-5 bg-linear-to-r from-indigo-900 to-stone-950 border border-indigo-950 rounded-2xl text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400">Order Dispatch active</span>
                  <h4 className="text-sm font-bold mt-1 text-white truncate max-w-sm">"{activeTrackBook.title}" — {activeTrackBook.quantity} copies</h4>
                  <p className="text-xs text-stone-300 mt-0.5">Tracking node dispatch: <b className="text-stone-100">{activeTrackBook.status.replace('_', ' ').toUpperCase()}</b></p>
                </div>
                <button
                  id="overview-quick-track"
                  onClick={() => setActiveSidebarTab('tracking')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold font-mono rounded-lg transition-colors shrink-0 text-white cursor-pointer"
                >
                  Retrieve tracking
                </button>
              </div>
            )}

            {/* Recent items grid (Two unequal columns: 8 vs 4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left recent books table (Col: 8) */}
              <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 shadow-3xs">
                <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider font-mono mb-4 text-left">📕 Recent Projects shelves</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 text-stone-400 font-mono text-[11px]">
                        <th className="pb-3 font-semibold uppercase">Spec Title</th>
                        <th className="pb-3 font-semibold uppercase">Print Qty</th>
                        <th className="pb-3 font-semibold uppercase">Binding Type</th>
                        <th className="pb-3 font-semibold uppercase">Tracking status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100/60 font-sans text-stone-700">
                      {books.slice(0, 4).map((book) => (
                        <tr key={book.id} className="hover:bg-stone-50/50">
                          <td className="py-3.5 pr-2">
                            <div className="font-bold text-stone-900 leading-tight">{book.title}</div>
                            <div className="text-[10px] text-stone-400 font-mono mt-0.5">ID: {book.id} · {book.pages} pages</div>
                          </td>
                          <td className="py-3.5 font-mono text-stone-800">{book.quantity} copies</td>
                          <td className="py-3.5">
                            <span className="font-semibold uppercase text-[11px] bg-stone-100 border border-stone-200/80 px-2 py-0.5 rounded-md text-stone-600">
                              {book.printFormat}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase ${
                              book.status === 'delivered' ? 'bg-emerald-50 border border-emerald-100 text-emerald-700' :
                              book.status === 'printing' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold' :
                              book.status === 'draft' ? 'bg-stone-100 border border-stone-200 text-stone-500' :
                              'bg-amber-50 border border-amber-100 text-amber-700'
                            }`}>
                              {book.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right helpers tips card (Col: 4) */}
              <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-3xs space-y-4">
                <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider font-mono text-left">💡 Pre-flight help</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 bg-amber-50/55 border border-amber-100 rounded-xl">
                    <span className="font-semibold text-stone-900 block font-display">Spine Calculation standard</span>
                    <p className="text-stone-500 mt-1 leading-normal font-sans text-[11px]">
                      Spine thickness (mm) is estimated as: <b>(Page count * 0.052) + 1.2mm</b> for paperback volumes.
                    </p>
                  </div>

                  <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                    <span className="font-semibold text-stone-900 block font-display">ISBN allocation timing</span>
                    <p className="text-stone-500 mt-1 leading-normal font-sans text-[11px]">
                      Legal barcoding allocation is completely passive and binds on submission checks automatically.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW: MY BOOKSHELF ================= */}
        {activeSidebarTab === 'books' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold font-display text-stone-950">The Pen-Name Bookshelf</h2>
              <p className="text-xs text-stone-500 mt-1">Scroll below to audit all active book models managed inside your publisher accounts.</p>
            </div>

            {/* Grid rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div 
                  key={book.id} 
                  id={`bookshelf-card-${book.id}`}
                  className="bg-white border border-stone-200 rounded-2xl p-6 hover:border-indigo-600/25 transition-all shadow-3xs hover:shadow-lg hover:shadow-indigo-600/5 relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Spine style sidebar representation in cards */}
                  <div className={`absolute top-0 bottom-0 left-0 w-3 ${book.coverColor || 'bg-stone-800'}`}></div>

                  <div className="pl-4">
                    {/* Upper card meta */}
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-400 mb-3 border-b border-stone-100 pb-2">
                      <span>ID: {book.id}</span>
                      <span className="uppercase text-indigo-700">{book.category}</span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 font-display line-clamp-1">{book.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Pen Name: <b className="text-stone-800">{book.author}</b></p>
                    
                    {/* Specs badges */}
                    <div className="flex flex-wrap gap-1.5 my-4">
                      <span className="px-2 py-0.5 rounded-sm border border-stone-200 font-mono text-[9px] bg-stone-50 font-bold text-stone-600">
                        {book.pages} PAGES
                      </span>
                      <span className="px-2 py-0.5 rounded-sm border border-stone-200 font-mono text-[9px] bg-stone-50 font-bold text-stone-600 uppercase">
                        {book.size} SIZE
                      </span>
                      <span className="px-2 py-0.5 rounded-sm border border-stone-200 font-mono text-[9px] bg-stone-50 font-bold text-stone-600 uppercase">
                        {book.colorType === 'bw' ? 'B&W INK' : 'Vivid color'}
                      </span>
                      <span className="px-2 py-0.5 rounded-sm border border-stone-200 font-mono text-[9px] bg-stone-50 font-bold text-stone-600 uppercase">
                        {book.printFormat}
                      </span>
                    </div>

                    <p className="text-xs text-stone-505 line-clamp-2 italic leading-relaxed font-sans mb-4">
                      "{book.description}"
                    </p>
                  </div>

                  {/* Actions footer inside list card */}
                  <div className="border-t border-stone-100 pt-4 mt-4 pl-4 flex items-center justify-between text-xs">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase ${
                      book.status === 'delivered' ? 'bg-emerald-100 border border-emerald-200 text-emerald-700' :
                      book.status === 'printing' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' :
                      book.status === 'draft' ? 'bg-stone-100 border border-stone-200 text-stone-500' :
                      'bg-amber-50 border border-amber-100 text-amber-700'
                    }`}>
                      {book.status.replace('_', ' ')}
                    </span>

                    {book.status !== 'draft' ? (
                      <button
                        onClick={() => {
                          setSelectedTrackingBookId(book.id);
                          setActiveSidebarTab('tracking');
                        }}
                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Trace order</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Prefill and route to step 3
                          setUpTitle(book.title);
                          setUpAuthor(book.author);
                          setUpCategory(book.category);
                          setUpLanguage(book.language);
                          setUpDescription(book.description);
                          setUpPages(book.pages);
                          setActiveSidebarTab('upload');
                        }}
                        className="text-xs font-bold text-stone-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="h-3.5 w-3.5" />
                        <span>Publish draft</span>
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= VIEW: BOOK UPLOAD SYSTEM (WIZARD) ================= */}
        {activeSidebarTab === 'upload' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold font-display text-stone-950">Book Publishing Wizard</h2>
              <p className="text-xs text-stone-500 mt-1">Configure metadata, upload files, select print settings, and publish your masterpiece.</p>
            </div>

            {/* Stepper Wizard Indicator Header */}
            <div className="grid grid-cols-3 gap-2 pb-6 border-b border-stone-100">
              {[
                { step: 1, label: 'Metadata Specs' },
                { step: 2, label: 'Manuscript Files' },
                { step: 3, label: 'Finalizing Prints' },
              ].map((st) => (
                <div 
                  key={st.step} 
                  className={`border-b-3 pb-3 text-center transition-all ${
                    wizardStep === st.step 
                      ? 'border-indigo-600 text-indigo-700 font-bold' 
                      : 'border-stone-200 text-stone-400 font-medium'
                  }`}
                >
                  <span className="block text-xs uppercase font-mono font-semibold tracking-wider">Step {st.step}</span>
                  <span className="text-[11px] sm:text-xs truncate block mt-0.5">{st.label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: Metadata inputs */}
            {wizardStep === 1 && (
              <div className="space-y-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-3xs animate-fade-in max-w-3xl mx-auto">
                <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider font-mono mb-4 text-left">📓 1. Core Book Metadata</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-semibold text-stone-700">Digital Book Title *</label>
                    <input
                      type="text"
                      required
                      value={upTitle}
                      onChange={(e) => setUpTitle(e.target.value)}
                      placeholder="e.g. Chronicles of the Spine"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#4F46E5] text-stone-900 font-semibold"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-semibold text-stone-700">Author / Pen Name *</label>
                    <input
                      type="text"
                      required
                      value={upAuthor}
                      onChange={(e) => setUpAuthor(e.target.value)}
                      placeholder="e.g. Elena Brooks"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#4F46E5] text-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-semibold text-stone-700">Primary Category spec</label>
                    <select
                      value={upCategory}
                      onChange={(e) => setUpCategory(e.target.value)}
                      className="w-full p-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-indigo-500 text-stone-900 font-semibold"
                    >
                      <option value="Literary Fiction">Literary Fiction</option>
                      <option value="Biographies">Biographies & Memoirs</option>
                      <option value="Technology">Technology & Systemics</option>
                      <option value="Poetry">Poetry Collection</option>
                      <option value="Education">Educational Textbooks</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-semibold text-stone-700">Language</label>
                    <select
                      value={upLanguage}
                      onChange={(e) => setUpLanguage(e.target.value)}
                      className="w-full p-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-indigo-500 text-stone-900 font-semibold"
                    >
                      <option value="English">English (UK/US standard)</option>
                      <option value="Hindi">Hindi (Regional DEV)</option>
                      <option value="German">German (Archival Deutsch)</option>
                      <option value="Spanish">Spanish (Latam Español)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <div className="flex justify-between text-xs">
                    <label className="font-semibold text-stone-700">Author's synopsis / marketing blurb</label>
                    <span className="font-mono text-stone-400">{upDescription.length} / 400 chars</span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={400}
                    value={upDescription}
                    onChange={(e) => setUpDescription(e.target.value)}
                    placeholder="Provide a compelling back-cover retail synopsis that will hook potential book buyers..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 text-stone-900 leading-normal"
                  />
                </div>

                {/* Wizard navigation buttons */}
                <div className="flex justify-end pt-4 border-t border-stone-100">
                  <button
                    onClick={() => {
                      if(!upTitle.trim()) {
                        alert("Title is required before proceeding.");
                        return;
                      }
                      setWizardStep(2);
                    }}
                    id="wizard-step1-next"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Files</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: File Upload boundaries */}
            {wizardStep === 2 && (
              <div className="space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-3xs animate-fade-in max-w-3xl mx-auto">
                <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider font-mono mb-4 text-left">📁 2. Set Archival Core Files</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* PDF Manuscript Drag & Drop zone */}
                  <div className="space-y-2 text-left">
                    <span className="block text-xs font-bold text-stone-700">Archival PDF Manuscript</span>
                    
                    <div
                      onDragOver={handleDragPdf}
                      onDrop={handleDropPdf}
                      onDragLeave={() => setIsDraggingPdf(false)}
                      className={`h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 transition-all ${
                        isDraggingPdf 
                          ? 'border-indigo-600 bg-indigo-50/50' 
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100/50'
                      }`}
                    >
                      <UploadCloud className="h-10 w-10 text-stone-400 mb-2" />
                      
                      {pdfFileName ? (
                        <div className="text-center">
                          <span className="block text-xs font-bold text-stone-800 font-mono truncate max-w-[200px]">{pdfFileName}</span>
                          <span className="text-[10px] text-stone-400 font-mono block mt-1">Filesize: {pdfFileSize}</span>
                          <button 
                            onClick={() => { setPdfFile(null); setPdfFileName(''); }}
                            className="text-[10px] text-red-600 font-bold hover:underline font-mono mt-2"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <div className="text-center font-sans">
                          <p className="text-xs font-bold text-stone-800">Drag & Drop Manuscript PDF</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">Accepts single high-res vector PDF files</p>
                          
                          <label className="mt-3 inline-block px-3 py-1 bg-white border border-stone-200 rounded-md text-[10px] font-bold text-indigo-700 hover:bg-stone-50 shadow-3xs cursor-pointer">
                            Browse Files
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleManuscriptSelect}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* JPG Cover Mock Drag & Drop zone */}
                  <div className="space-y-2 text-left">
                    <span className="block text-xs font-bold text-stone-700">Cover Blueprint Graphic</span>
                    
                    <div
                      onDragOver={handleDragCover}
                      onDrop={handleDropCover}
                      onDragLeave={() => setIsDraggingCover(false)}
                      className={`h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 transition-all ${
                        isDraggingCover 
                          ? 'border-indigo-600 bg-indigo-50/50' 
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100/50'
                      }`}
                    >
                      <UploadCloud className="h-10 w-10 text-stone-400 mb-2" />
                      
                      {coverFileName ? (
                        <div className="text-center">
                          <span className="block text-xs font-bold text-stone-800 font-mono truncate max-w-[200px]">{coverFileName}</span>
                          <span className="text-[10px] text-stone-400 font-mono block mt-1">Format: JPG / PNG (300dpi)</span>
                          <button 
                            onClick={() => { setCoverFile(null); setCoverFileName(''); }}
                            className="text-[10px] text-red-600 font-bold hover:underline font-mono mt-2"
                          >
                            Remove cover file
                          </button>
                        </div>
                      ) : (
                        <div className="text-center font-sans">
                          <p className="text-xs font-bold text-stone-800">Drag & Drop Cover Image</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">300 DPI flat spread wrapper graphic</p>
                          
                          <label className="mt-3 inline-block px-3 py-1 bg-white border border-stone-200 rounded-md text-[10px] font-bold text-indigo-700 hover:bg-stone-50 shadow-3xs cursor-pointer">
                            Browse Graphics
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCoverSelect}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Prepackaged simulation values banner */}
                <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-start gap-2 text-xs text-stone-600">
                  <AlertCircle className="h-4.5 w-4.5 text-indigo-600 mt-0.5 shrink-0" />
                  <p>In this sandbox prototype, uploading files is simulated locally. Choosing raw PDF files calculates layouts immediately. If you have no file, proceed to step 3 directly—we will inject a high-contrast mock blueprint for you!</p>
                </div>

                {/* Navigation Row */}
                <div className="flex justify-between pt-4 border-t border-stone-100">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Back to Metadata</span>
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    id="wizard-step2-next"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Confirm Layout</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Printing specification finalizing */}
            {wizardStep === 3 && (
              <div className="space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-3xs animate-fade-in max-w-3xl mx-auto">
                <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider font-mono mb-4 text-left">⚙️ 3. Physical printing formats</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                  
                  {/* Page counts and formatting */}
                  <div className="space-y-4">
                    
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-semibold text-stone-800">Final block page count</label>
                      <input
                        type="number"
                        min="24"
                        value={upPages}
                        onChange={(e) => setUpPages(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#4F46E5] font-mono font-bold text-stone-900"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-semibold text-stone-800">Physical Size format</label>
                      <select
                        value={upSize}
                        onChange={(e) => setUpSize(e.target.value as 'A5' | 'A4' | '6x9' | '5.5x8.5')}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs tracking-tight text-stone-900 font-bold focus:outline-hidden focus:border-indigo-500"
                      >
                        <option value="A5">A5 Novel Standard (148 x 210mm)</option>
                        <option value="A4">A4 Large Folder size</option>
                        <option value="6x9">6 x 9 Inches US Standard</option>
                        <option value="5.5x8.5">5.5 x 8.5 US Trade Digest</option>
                      </select>
                    </div>

                  </div>

                  {/* Quantity and Ink types */}
                  <div className="space-y-4">
                    
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-semibold text-stone-800">Initial Print Volume copies *</label>
                      <input
                        type="number"
                        min="1"
                        value={upQty}
                        onChange={(e) => setUpQty(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono font-bold text-stone-900"
                      />
                    </div>

                    {/* Bind and Ink selectors */}
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="space-y-1">
                        <span className="block text-xs font-semibold text-stone-700">Binding Type</span>
                        <div className="grid grid-cols-2 bg-stone-100 p-1 rounded-md border border-stone-200">
                          <button
                            onClick={() => setUpFormat('paperback')}
                            className={`py-1 text-[10px] font-bold rounded-sm transition-colors ${
                              upFormat === 'paperback' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-stone-500'
                            }`}
                          >
                            Paper
                          </button>
                          <button
                            onClick={() => setUpFormat('hardcover')}
                            className={`py-1 text-[10px] font-bold rounded-sm transition-colors ${
                              upFormat === 'hardcover' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-stone-500'
                            }`}
                          >
                            Hard
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="block text-xs font-semibold text-stone-700">Ink Premium</span>
                        <div className="grid grid-cols-2 bg-stone-100 p-1 rounded-md border border-stone-200">
                          <button
                            onClick={() => setUpColor('bw')}
                            className={`py-1 text-[10px] font-bold rounded-sm transition-colors ${
                              upColor === 'bw' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-stone-500'
                            }`}
                          >
                            B&W
                          </button>
                          <button
                            onClick={() => setUpColor('color')}
                            className={`py-1 text-[10px] font-bold rounded-sm transition-colors ${
                              upColor === 'color' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-stone-500'
                            }`}
                          >
                            Color
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Pricing reference inline metrics */}
                <div className="p-4 bg-stone-900 text-stone-200 rounded-xl flex items-center justify-between text-xs font-mono text-left">
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold tracking-wider">Estimated print volume cost</span>
                    <span className="text-base font-extrabold text-[#F97316]">${(upPages * 0.018 * upQty).toFixed(2)} USD</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold tracking-wider">ISBN Allocation status</span>
                    <span className="text-emerald-400 font-bold">FREE · INCLUDED</span>
                  </div>
                </div>

                {/* Final step action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 justify-between pt-4 border-t border-stone-100">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 font-bold rounded-xl text-xs flex items-center gap-1 justify-center order-2 sm:order-1 cursor-pointer"
                  >
                    <span>Back to Files</span>
                  </button>

                  <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
                    <button
                      onClick={() => handleWizardSubmit('draft')}
                      id="save-draft-btn"
                      className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 font-semibold border border-stone-200 text-stone-700 rounded-xl text-xs flex items-center gap-1.5 justify-center cursor-pointer w-full sm:w-auto"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Draft</span>
                    </button>
                    <button
                      onClick={() => handleWizardSubmit('under_review')}
                      id="submit-review-btn"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-xl text-xs flex items-center gap-1.5 justify-center cursor-pointer w-full sm:w-auto shadow-sm"
                    >
                      <BookCheck className="h-4 w-4" />
                      <span>Submit for Review</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ================= VIEW: ORDER TRACKING SYSTEM ================= */}
        {activeSidebarTab === 'tracking' && (
          <div className="space-y-6 animate-fade-in text-left">
            
            {/* Header metadata selection */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <h2 className="text-2xl font-bold font-display text-stone-950">Active Orders Trace Utility</h2>
                <p className="text-xs text-stone-500 mt-1">Audit modern horizontal progress trackers and carrier dispatches for your volumes.</p>
              </div>

              {/* Book specifications dropdown selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-600 font-mono">Select Book spec:</span>
                <select
                  value={selectedTrackingBookId}
                  onChange={(e) => setSelectedTrackingBookId(e.target.value)}
                  className="p-2 text-xs font-extrabold bg-white border border-stone-200 rounded-lg font-mono focus:outline-hidden"
                  id="tracking-book-dropdown"
                >
                  {books.filter(b => b.status !== 'draft').map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title} ({b.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeTrackBook ? (
              <div className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-3xs animate-fade-in">
                
                {/* Meta details header in tracker view */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400">Order ID Registry</span>
                    <p className="text-sm font-bold text-stone-900 mt-0.5">{activeTrackBook.id}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400">Printed copy count</span>
                    <p className="text-sm font-bold text-stone-900 mt-0.5">{activeTrackBook.quantity} units</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400">Estimated Delivery</span>
                    <p className="text-sm font-semibold text-indigo-700 mt-0.5">{activeTrackBook.estimatedDelivery || "Calculating"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400">Print format binding</span>
                    <p className="text-sm font-bold text-stone-900 mt-0.5 uppercase">{activeTrackBook.printFormat} | {activeTrackBook.size}</p>
                  </div>
                </div>

                {/* ELEGANT HORIZONTAL PROGRESS BAR TRACKER GRID */}
                <div id="horizontal-progress-bar" className="py-8 relative">
                  
                  {/* Progress Connector track line background */}
                  <div className="absolute top-[48px] left-[5%] right-[5%] h-1 bg-stone-100 -translate-y-1/2 z-0"></div>
                  
                  {/* Mapped Active coloring line */}
                  <div 
                    className="absolute top-[48px] left-[5%] h-1 bg-indigo-600 -translate-y-1/2 transition-all duration-700 z-0"
                    style={{ width: `${(activeStageIdx / (trackingStages.length - 1)) * 90}%` }}
                  ></div>

                  {/* Horizontal indicators */}
                  <div className="grid grid-cols-5 relative z-10">
                    {trackingStages.map((stage, idx) => {
                      const isCompleted = idx < activeStageIdx;
                      const isActive = idx === activeStageIdx;
                      const isPending = idx > activeStageIdx;

                      let nodeColor = 'bg-stone-50 border-stone-200 text-stone-400';
                      if (isActive) nodeColor = 'bg-indigo-600 border-indigo-600 text-stone-50 ring-4 ring-indigo-500/15 animate-pulse';
                      if (isCompleted) nodeColor = 'bg-indigo-50 border-indigo-600 text-indigo-700';

                      return (
                        <div key={stage.id} className="text-center flex flex-col items-center">
                          
                          {/* Circle Node visual */}
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold ${nodeColor} mb-3.5`}>
                            {isCompleted ? (
                              <Check className="h-4.5 w-4.5" />
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>

                          <span className={`block text-[11px] sm:text-xs font-extrabold font-display leading-tight truncate px-1 ${
                            isActive ? 'text-indigo-600 font-bold' : isCompleted ? 'text-stone-800' : 'text-stone-400'
                          }`}>
                            {stage.label}
                          </span>
                          
                          <span className="block text-[8px] sm:text-[9.5px] text-stone-400 font-mono mt-0.5 max-w-[100px] truncate leading-tight">
                            {stage.desc}
                          </span>

                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Prototype Status Modifier panel */}
                <div className="mt-8 p-4.5 bg-stone-100 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="block text-xs font-bold text-stone-800">Mock stage controller</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Increment stages in this sandbox representation to preview other visual tracking status layouts.</p>
                  </div>

                  <div className="flex gap-2">
                    {trackingStages.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          activeTrackBook.status = st.id as any;
                          setSelectedTrackingBookId('');
                          setTimeout(() => setSelectedTrackingBookId(activeTrackBook.id), 20);
                        }}
                        className={`px-2 py-1 text-[9px] font-mono font-bold rounded border cursor-pointer ${
                          activeTrackBook.status === st.id 
                            ? 'bg-indigo-600 border-indigo-600 text-stone-50' 
                            : 'bg-white border-stone-200 text-stone-605 walk-badge'
                        }`}
                      >
                        {st.id.replace('_', ' ').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 bg-white rounded-2xl border border-stone-200 text-center text-stone-500 text-xs">
                No active orders are pending tracking. Go draft and print some items inside the Book Publishing Wizard tab!
              </div>
            )}

          </div>
        )}

        {/* ================= VIEW: ROYALTIES AUDIT ================= */}
        {activeSidebarTab === 'earnings' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold font-display text-stone-950">Royalties Auditing & Cashouts</h2>
              <p className="text-xs text-stone-505 mt-1">Audit outstanding retail royalties generated through Amazon Prime and Barnes & Noble networks.</p>
            </div>

            {/* Income summaries panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-3xs">
                <TrendingUp className="h-5 w-5 text-indigo-600 mb-3" />
                <span className="block text-xs text-stone-400 font-mono font-bold uppercase">Outstanding balance</span>
                <span className="block text-3xl font-extrabold font-display text-stone-950 mt-1">$120.45</span>
                <p className="text-xs text-stone-500 mt-1">Ready for direct IMPS NEFT cashouts.</p>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-3xs">
                <DollarSign className="h-5 w-5 text-emerald-600 mb-3" />
                <span className="block text-xs text-stone-400 font-mono font-bold uppercase">Lifetime Dispatched</span>
                <span className="block text-3xl font-extrabold font-display text-stone-950 mt-1">$412.00</span>
                <p className="text-xs text-emerald-600 font-semibold mt-1">All clearance checks OK.</p>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-3xs">
                <BookCheck className="h-5 w-5 text-amber-500 mb-3" />
                <span className="block text-xs text-stone-400 font-mono font-bold uppercase">Tax Deductions TDS</span>
                <span className="block text-3xl font-extrabold font-display text-stone-950 mt-1">10.00%</span>
                <p className="text-xs text-stone-500 mt-1">Standard PAN card filing approved.</p>
              </div>

            </div>

            {/* Cashout simulator Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-3">
              
              {/* Form panel (Col: 7) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-3xs">
                <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider font-mono mb-4">🏦 Direct Bank Cashout Gate</h3>
                
                <form onSubmit={handleCashout} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-stone-700">Withdrawal Amount ($ USD)</label>
                    <input
                      type="number"
                      required
                      max="450"
                      value={cashoutAmount}
                      onChange={(e) => setCashoutAmount(e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-sm focus:outline-hidden"
                    />
                    <span className="block text-[10px] text-stone-400 font-mono">Max allowable withdrawal: $450 USD.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-stone-700">Bank IFSC / Routing Code</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. UTIB0001844"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-stone-700">Checking Account ID</label>
                      <input
                        type="password"
                        required
                        placeholder="Account password verification"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {cashStatus && (
                    <div className="p-3 bg-stone-50 border border-stone-150 text-xs font-mono font-medium rounded-lg text-indigo-700">
                      {cashStatus}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-stone-50 font-bold rounded-lg text-xs font-mono cursor-pointer transition-colors shadow-xs"
                  >
                    Initiate Clearance Transfer
                  </button>
                </form>
              </div>

              {/* Transactions logs table (Col: 5) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-3xs space-y-4">
                <h3 className="text-sm font-bold uppercase text-stone-400 tracking-wider font-mono">📜 Clearance Log</h3>
                
                <div className="divide-y divide-stone-100/60 font-mono text-[11px] text-stone-600">
                  <div className="py-2.5 flex justify-between items-center">
                    <div>
                      <span className="block text-stone-900 font-bold">#PB-TX-804</span>
                      <span className="text-[10px] text-stone-400">June 12, 2026 (IMPS)</span>
                    </div>
                    <span className="text-emerald-600 font-bold">+$180.00 PAID</span>
                  </div>

                  <div className="py-2.5 flex justify-between items-center">
                    <div>
                      <span className="block text-stone-900 font-bold">#PB-TX-792</span>
                      <span className="text-[10px] text-stone-400">May 21, 2026 (UPI)</span>
                    </div>
                    <span className="text-emerald-600 font-bold">+$232.00 PAID</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW: MESSAGES CHAT INBOX ================= */}
        {activeSidebarTab === 'messages' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold font-display text-stone-950">Inbound Support Chat</h2>
              <p className="text-xs text-stone-500 mt-1">Communicate live with typesetting editors, designers, and printing logistics staff.</p>
            </div>

            {/* Chat Area container */}
            <div className="bg-white border border-stone-200 rounded-2xl flex flex-col h-[55vh] shadow-3xs overflow-hidden">
              
              {/* Header profile info */}
              <div className="bg-stone-50 border-b border-stone-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold relative">
                    EB
                    {/* Active green indicator ring */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-stone-900">Elena Brooks</span>
                    <span className="block text-[10px] text-stone-400 font-mono uppercase tracking-wider font-semibold">Lead typeset director · ONLINE</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 font-mono uppercase">Ticket reference</span>
                  <p className="text-xs font-bold text-stone-700 font-mono opacity-80">#PB-CHAT-902</p>
                </div>
              </div>

              {/* Message scroll sheets */}
              <div className="grow p-6 space-y-4 overflow-y-auto bg-[#FBFBFA]">
                {chatMessages.map((msg) => {
                  const isAuthor = msg.sender === 'author';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAuthor ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-xs sm:text-sm ${
                        isAuthor 
                          ? 'bg-indigo-600 text-stone-50 rounded-tr-xs' 
                          : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-3xs'
                      }`}>
                        <p className="leading-relaxed font-normal">{msg.text}</p>
                        <span className={`block text-[8px] font-mono mt-1 text-right  ${isAuthor ? 'text-stone-300' : 'text-stone-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message input bar */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-stone-200 flex gap-2">
                <input
                  type="text"
                  required
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message to Elena (try mentioning 'ISBN', 'bleed', or 'hardcover'...)"
                  className="grow px-4.5 py-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-500 text-stone-900"
                  id="chat-user-message-input"
                />
                <button
                  type="submit"
                  id="chat-send-btn"
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-stone-50 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 cursor-pointer shadow-3xs"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}
