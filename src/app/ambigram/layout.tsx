import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ambigram Tattoo Generator | Create Unique Ambigram Designs',
  description: 'Create stunning ambigram tattoo designs that can be read from multiple angles. Our free ambigram generator creates unique designs perfect for tattoos, perfect for representing two names or words.',
  keywords: 'ambigram generator, ambigram tattoo generator, ambigram maker, ambigram creator, custom ambigram, ambigram designer, ambigram tattoo designs, name ambigram',
  openGraph: {
    title: 'Ambigram Tattoo Generator | Create Unique Ambigram Designs',
    description: 'Create stunning ambigram tattoo designs that can be read from multiple angles. Perfect for tattoos that represent two names or words in one elegant design.',
    url: 'https://tattooidea.ai/ambigram',
    siteName: 'TattooIdea AI',
    images: [
      {
        url: 'https://tattooidea.ai/og/ambigram-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'Ambigram Tattoo Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ambigram Tattoo Generator | Create Unique Ambigram Designs',
    description: 'Create stunning ambigram tattoo designs that can be read from multiple angles. Perfect for tattoos that represent two names or words.',
    images: ['https://tattooidea.ai/og/ambigram-generator.jpg'],
  },
  alternates: {
    canonical: 'https://tattooidea.ai/ambigram',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'TattooIdea AI' }],
};

export default function AmbigramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Ambigram Tattoo Generator',
            description: 'Create stunning ambigram tattoo designs that can be read from multiple angles. Perfect for representing two names or words in one elegant design.',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            screenshot: 'https://tattooidea.ai/og/ambigram-generator.jpg',
            featureList: 'Generate ambigram designs, Multiple style options, Download high-quality designs, Preview on tattoo mockups',
            url: 'https://tattooidea.ai/ambigram',
            author: {
              '@type': 'Organization',
              name: 'TattooIdea AI',
              url: 'https://tattooidea.ai',
            },
          }),
        }}
      />
      {children}
    </>
  );
} 