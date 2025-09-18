import React from 'react';
import Header from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TeaSpill - Tattoo Design Insights and Trends',
  description: 'Discover the latest tattoo design trends, insights, and inspiration. TeaSpill brings you expert tips and ideas for your next tattoo.',
  keywords: 'tattoo trends, tattoo insights, tattoo design ideas, tattoo inspiration, teaspill',
  openGraph: {
    title: 'TeaSpill - Tattoo Design Insights and Trends',
    description: 'Discover the latest tattoo design trends, insights, and inspiration. TeaSpill brings you expert tips and ideas for your next tattoo.',
    url: 'https://www.tattooidea.tattoo/teaspill',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeaSpill - Tattoo Design Insights and Trends',
    description: 'Discover the latest tattoo design trends, insights, and inspiration. TeaSpill brings you expert tips and ideas for your next tattoo.',
  },
  alternates: {
    canonical: 'https://tattooidea.vercel.app/teaspill',
  },
};

export default function TeaspillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
} 