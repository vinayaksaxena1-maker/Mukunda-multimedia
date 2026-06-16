/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  description: string;
  coverImage?: string; // Data URL or template pattern
  coverColor: string; // Tailwind bg class for a pretty mock cover
  manuscriptName?: string;
  pages: number;
  size: 'A5' | 'A4' | '6x9' | '5.5x8.5';
  colorType: 'bw' | 'color';
  printFormat: 'paperback' | 'hardcover';
  quantity: number;
  status: 'under_review' | 'approved' | 'printing' | 'shipped' | 'delivered' | 'draft';
  orderDate: string;
  estimatedDelivery?: string;
  pricePaid?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  bookTitle: string;
  quote: string;
  rating: number;
  coverColor: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'publishing' | 'pricing' | 'design' | 'delivery';
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatarColor: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceStart: string;
  features: string[];
  color: string;
}

export interface Message {
  id: string;
  sender: 'author' | 'assistant' | 'system';
  text: string;
  timestamp: string;
}

export interface PricingConfig {
  pages: number;
  size: 'A5' | '6x9' | 'Custom';
  isColor: boolean;
  quantity: number;
}
