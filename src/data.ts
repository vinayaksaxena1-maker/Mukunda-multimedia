/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book, Testimonial, FaqItem, TeamMember, ServiceItem } from './types';

export const BENTO_FEATURES = [
  {
    id: 1,
    title: "Fast Printing",
    description: "Industry-leading 7-day turnaround with end-to-end telemetry and automated QA checks.",
    badge: "7-Day Promise",
    color: "from-blue-500/10 to-indigo-500/10 text-indigo-700 border-indigo-100",
    iconName: "Zap"
  },
  {
    id: 2,
    title: "ISBN Support",
    description: "Get full official ISBN allocation and registration across Global Barcode Registrars.",
    badge: "Free Allocation",
    color: "from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-100",
    iconName: "Bookmark"
  },
  {
    id: 3,
    title: "Cover & Layout Format",
    description: "Stunning professional template engine for spine calculations and bleed alignment.",
    badge: "Pixel Perfect",
    color: "from-amber-500/10 to-orange-500/10 text-orange-700 border-orange-100",
    iconName: "Layers"
  },
  {
    id: 4,
    title: "Worldwide Shipping",
    description: "Deliver paperback and hardcover prints of your bestseller to 150+ countries with custom tracking.",
    badge: "Global Network",
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-100",
    iconName: "Globe"
  },
  {
    id: 5,
    title: "Author Dashboard",
    description: "Upload manuscripts, review 3D proof sheets, track physical shipments, and audit earnings live.",
    badge: "Central Command",
    color: "from-sky-500/10 to-indigo-500/10 text-sky-700 border-sky-100",
    iconName: "Layout"
  },
  {
    id: 6,
    title: "Print-On-Demand",
    description: "No massive overheads. Order exactly what you need—from a single physical copy to 10,000+ orders.",
    badge: "Zero Waste",
    color: "from-rose-500/10 to-red-500/10 text-rose-700 border-rose-100",
    iconName: "Printer"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Elena Vance",
    role: "Founder & Chief Editor",
    bio: "Ex-trad-publisher who believes independent authors deserve boutique, world-class design standards.",
    avatarColor: "bg-indigo-100 text-indigo-600 border-indigo-200"
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Lead Typesetting Expert",
    bio: "Obsessed with perfect gutters, font tracking, and premium 80gsm natural cream paper stocks.",
    avatarColor: "bg-amber-100 text-amber-600 border-amber-200"
  },
  {
    id: 3,
    name: "Sarah Lin",
    role: "Creative Cover Director",
    bio: "Believes a brilliant book cover should tell a story in a single, high-contrast emotional chord.",
    avatarColor: "bg-purple-100 text-purple-600 border-purple-200"
  },
  {
    id: 4,
    name: "Rajiv Mehta",
    role: "Global Logistics Lead",
    bio: "Expert on Amazon KDP distributions, national libraries indexing, and bulk air cargo routes.",
    avatarColor: "bg-emerald-100 text-emerald-600 border-emerald-200"
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "printing",
    title: "Book Printing",
    description: "Premium physical books with high-definition digital printing. Select soft, velvet spine-wrapping or premium robust hardcover bindings.",
    priceStart: "$2.40 per copy",
    features: ["Paperback or Hardcover binding", "Eco-friendly cream or archival white paper", "Glossy or matte soft-touch covers", "Smyth-sewn or perfect-bound blocks"],
    color: "indigo"
  },
  {
    id: "publishing",
    title: "Self-Publishing Bundle",
    description: "Fast-track your submission. We handle legal barcodes, registration with national library systems, copyright filings, and ISBN allocation.",
    priceStart: "$199 one-time fee",
    features: ["Official ISBN & Barcode", "Copyright security registration", "Legal depository filing", "Full copyright retention"],
    color: "purple"
  },
  {
    id: "design",
    title: "Professional formatting",
    description: "Work with veteran designers to prepare custom spine-width templates, aesthetic interior grid-spacing, and gorgeous typography alignment.",
    priceStart: "$299 custom design",
    features: ["Ebook-compatible ePUB compilation", "Clean paperback layout alignment", "Custom visual mockups & covers", "Unlimited revision rounds"],
    color: "amber"
  },
  {
    id: "distribution",
    title: "Worldwide Distribution",
    description: "Send your physical volumes global. Synchronized listings across Amazon, Flipkart, Barnes & Noble, and IngramSpark print networks.",
    priceStart: "$149 launch package",
    features: ["Amazon Prime-eligible indexing", "Flipkart & regional retailer inclusion", "Real-time royalty audit charts", "Global library database sync"],
    color: "emerald"
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: "B-102",
    title: "Echoes of the Red Soil",
    author: "Clara Winters",
    category: "Literary Fiction",
    language: "English",
    description: "A sweeping historical novel set in the rural heartlands, tracing the bonds of family across three generations of agricultural change.",
    coverColor: "bg-amber-600",
    pages: 284,
    size: "A5",
    colorType: "bw",
    printFormat: "paperback",
    quantity: 120,
    status: "shipped",
    orderDate: "2026-06-02",
    estimatedDelivery: "2026-06-18",
    pricePaid: 456.80
  },
  {
    id: "B-103",
    title: "Inside the Compiler Gate",
    author: "David Vance",
    category: "Technology",
    language: "English",
    description: "A deep dive into parsing algorithms, virtual compilers, and optimization structures designed for modern system programmers.",
    coverColor: "bg-indigo-800",
    pages: 412,
    size: "6x9",
    colorType: "bw",
    printFormat: "hardcover",
    quantity: 50,
    status: "printing",
    orderDate: "2026-06-12",
    estimatedDelivery: "2026-06-22",
    pricePaid: 389.50
  },
  {
    id: "B-104",
    title: "The Whispering Dunes",
    author: "Clara Winters",
    category: "Poetry",
    language: "English",
    description: "A delicate collection of free verse poetry detailing light, shadow, sand, and ocean winds from long summers spent on coastal retreats.",
    coverColor: "bg-emerald-700",
    pages: 94,
    size: "A5",
    colorType: "color",
    printFormat: "paperback",
    quantity: 10,
    status: "under_review",
    orderDate: "2026-06-15",
    estimatedDelivery: "2026-06-26",
    pricePaid: 84.00
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Clara Winters",
    role: "Award-winning Novelist",
    bookTitle: "Echoes of the Red Soil",
    quote: "Seeing my manuscript transformed into a physical, soft-touch matte paperback with perfect bindings was magical. The 7-day printing turnaround blew my expectations away. My initial 100 print copies were gone in days!",
    rating: 5,
    coverColor: "bg-amber-600"
  },
  {
    id: 2,
    name: "David Vance",
    role: "Senior Systems Engineer",
    bookTitle: "Inside the Compiler Gate",
    quote: "The interactive cost calculator is incredibly accurate, with absolutely no hidden fees. Plus, the hardcover printing quality rivaled any traditional house. The spine glue is thick and rigid—highly recommended.",
    rating: 5,
    coverColor: "bg-indigo-800"
  },
  {
    id: 3,
    name: "Miriam Al-Jamil",
    role: "Anthology Compiler",
    bookTitle: "Behind the Sand Dunes",
    quote: "Global distribution setup was flawless. Within four days of submittal via their dashboard, my anthology was Prime-eligible on Amazon. The royalty tracking tables save me hours of spreadsheet auditing.",
    rating: 5,
    coverColor: "bg-emerald-700"
  }
];

export const FAQs: FaqItem[] = [
  {
    id: 1,
    question: "What are the minimum order quantities for printing?",
    answer: "There are absolutely no minimums! Our platform is built on modern Print-On-Demand (POD) tech. You can order exactly 1 copy to inspect the weight and bindings, or bulk order 10,000 copies to prepare for speaking events.",
    category: "pricing"
  },
  {
    id: 2,
    question: "Do I retain 100% of my book rights and copyright?",
    answer: "Yes, completely! When you publish or print with us, you retain full intellectual property of your manuscripts and cover materials. We only act as your distribution partner and print facilitator.",
    category: "publishing"
  },
  {
    id: 3,
    question: "How do ISBN allocation and legal indexing work?",
    answer: "We offer complete ISBN allocations under our publishing bundle. This registers your book with official global GS1 barcode repositories, national libraries, and online marketplace databases, making it searchable by retailers.",
    category: "publishing"
  },
  {
    id: 4,
    question: "What is the difference between Paperback and Hardcover blocks?",
    answer: "Paperback uses strong hot-melt EVA glue (perfect binding) with durable cardstock wraps. Hardcover uses Smyth-sewn paper signatures bonded to a thick 2mm greyboard wrap, with optional paper dust jackets for a premium look.",
    category: "design"
  },
  {
    id: 5,
    question: "How do you calculate printing and distribution times?",
    answer: "Once our expert typesetters approve your files (usually within 24 hours), standard printing takes 4-5 business days. Express domestic shipping is 2-3 business days, meaning books arrive at your doorstep within roughly a week.",
    category: "delivery"
  },
  {
    id: 6,
    question: "Can I print in full-color or just black and white?",
    answer: "Both! We support rich inkjet full-color printing (optimum for cookbooks, children's literature, art reviews) and high-contrast digital monochrome black-and-white printings for novels and educational texts.",
    category: "design"
  }
];
