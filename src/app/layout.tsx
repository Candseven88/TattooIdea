import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Analytics from "@/components/Analytics";
import AdvancedSEO from "@/components/AdvancedSEO";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional AI Tattoo Design Generator | Expert-Quality Custom Tattoo Ideas",
  description: "Create stunning, personalized tattoo designs using our professional-grade AI technology. Trained on thousands of expert tattoo artworks, our AI generates authentic designs across 18+ styles. Perfect for consultation with tattoo artists. Free to use with transparent AI methodology.",
  keywords: "ai tattoo generator, professional tattoo design, custom tattoo ideas, ai-generated tattoo art, machine learning tattoo design, artificial intelligence tattoo creator, expert tattoo concepts, tattoo style generator, digital tattoo art, tattoo consultation tool",
  metadataBase: new URL('https://www.tattooidea.tattoo'),
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: "Tattoo Ideas Generator AI Research Team",
      url: "https://www.tattooidea.tattoo"
    }
  ],
  creator: "AI Design Technologies",
  publisher: "Tattoo Ideas Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: "Technology",
  classification: "AI-Powered Design Tool",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tattooidea.vercel.app',
    title: 'Professional AI Tattoo Design Generator | Expert-Quality Custom Tattoo Ideas',
    description: 'Create stunning, personalized tattoo designs using our professional-grade AI technology. Trained on expert artworks across 18+ styles. Free to use with transparent methodology.',
    siteName: 'Professional AI Tattoo Generator',
    images: [
      {
        url: '/images/og-tattoo-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional AI Tattoo Design Generator - Create Custom Tattoo Ideas'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional AI Tattoo Design Generator | Expert-Quality Custom Tattoo Ideas',
    description: 'Create stunning, personalized tattoo designs using our professional-grade AI technology. Trained on expert artworks across 18+ styles.',
    images: ['/images/twitter-tattoo-generator.jpg'],
    creator: '@tattooideagen'
  },
  verification: {
    google: 'google-site-verification-token-here'
  },
  other: {
    'ai-content-declaration': 'This website uses AI technology to generate tattoo designs. All AI usage is clearly disclosed and transparent.',
    'content-methodology': 'AI-generated designs created using machine learning models trained on professional tattoo artistry',
    'expert-review': 'Designs are created for consultation with professional tattoo artists',
    'trustworthiness': 'Professional-grade AI system with transparent methodology and quality controls'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Creative Tattoo Ideas Generator | AI Tattoo Design Tool" />
        <meta property="og:description" content="Discover unique tattoo ideas for men and women. Our AI tattoo generator creates custom designs from phoenix tattoos to hand tattoos." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Creative Tattoo Ideas Generator | AI Tattoo Design Tool" />
        <meta name="twitter:description" content="Discover unique tattoo ideas for men and women. Our AI tattoo generator creates custom designs from phoenix tattoos to hand tattoos." />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdvancedSEO />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
