"use client";

import React from 'react';

interface SEOStructuredDataProps {
  url?: string;
}

const SEOStructuredData: React.FC<SEOStructuredDataProps> = ({ 
  url = "https://tattoo-ideas-generator.com" 
}) => {
  // WebApplication Schema - Main application
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}/#webapp`,
    "name": "Professional AI Tattoo Design Generator",
    "alternateName": "Tattoo Ideas Generator",
    "description": "Create custom tattoo designs using advanced AI technology. Our professional-grade system combines artistic expertise with artificial intelligence to generate unique, high-quality tattoo concepts.",
    "url": url,
    "applicationCategory": "DesignApplication",
    "applicationSubCategory": "TattooDesign",
    "operatingSystem": "Web Browser",
    "browserRequirements": "HTML5, JavaScript",
    "softwareVersion": "2.0",
    "dateCreated": "2024-01-01",
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Tattoo Ideas Generator",
      "url": url,
      "description": "Professional AI tattoo design platform combining cutting-edge technology with traditional tattoo artistry."
    },
    "creator": {
      "@type": "Organization",
      "name": "AI Design Technologies",
      "description": "Specialists in AI-powered creative design tools with expertise in artistic applications."
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "category": "Free with Premium Options"
    },
    "featureList": [
      "AI-powered tattoo design generation",
      "18+ professional tattoo styles",
      "Realistic body placement visualization", 
      "High-quality design output",
      "Professional consultation support"
    ],
    "screenshot": `${url}/images/app-screenshot.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": `${url}/#generator`,
      "name": "Generate Tattoo Design"
    }
  };

  // SoftwareApplication Schema - Technical details
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}/#software`,
    "name": "AI Tattoo Design Generator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "softwareRequirements": "Modern web browser with JavaScript support",
    "memoryRequirements": "2GB RAM minimum",
    "releaseNotes": "Enhanced AI models with improved artistic accuracy and style recognition",
    "softwareHelp": {
      "@type": "CreativeWork",
      "url": `${url}/#how-it-works`,
      "name": "How to Use AI Tattoo Generator"
    },
    "maintainer": {
      "@type": "Organization", 
      "name": "Tattoo Ideas Generator Development Team"
    },
    "license": "Proprietary",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Tattoo Ideas Generator"
    }
  };

  // Service Schema - Professional AI service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    "name": "Professional AI Tattoo Design Service",
    "description": "Expert AI-powered tattoo design generation service using advanced machine learning models trained on professional tattoo artistry principles.",
    "provider": {
      "@type": "Organization",
      "name": "Tattoo Ideas Generator",
      "url": url,
      "expertise": "Artificial Intelligence, Tattoo Design, Digital Art"
    },
    "serviceType": "AI Design Generation",
    "audience": {
      "@type": "Audience",
      "audienceType": "Tattoo enthusiasts, artists, and design seekers",
      "geographicArea": "Worldwide"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceType": "Online",
      "serviceUrl": url,
      "availableLanguage": ["en", "es", "fr", "de", "it", "pt", "zh"]
    },
    "category": "Design and Creative Services",
    "termsOfService": `${url}/terms`,
    "privacyPolicy": `${url}/privacy`
  };

  // CreativeWork Schema - AI methodology transparency  
  const aiMethodologySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}/#methodology`,
    "name": "AI Tattoo Design Methodology",
    "description": "Our AI system combines multiple advanced machine learning models trained on thousands of professional tattoo designs, artistic principles, and style characteristics.",
    "author": {
      "@type": "Organization",
      "name": "Tattoo Ideas Generator AI Research Team",
      "expertise": "Machine Learning, Computer Vision, Artistic AI"
    },
    "about": "Transparent methodology for AI-generated tattoo designs",
    "keywords": [
      "AI tattoo design",
      "machine learning art",
      "artificial intelligence creativity", 
      "automated design generation",
      "neural network art"
    ],
    "educationalLevel": "Professional",
    "learningResourceType": "Methodology Documentation",
    "teaches": [
      "How AI understands tattoo design principles",
      "Multi-model AI approach to creative generation",
      "Quality assurance in AI-generated artwork"
    ]
  };

  // FAQ Schema for common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the AI tattoo generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI tattoo generator uses advanced machine learning models trained on thousands of professional tattoo designs. When you describe your idea, the AI analyzes your text using natural language processing, then generates custom designs that match your vision while respecting traditional tattoo artistry principles."
        }
      },
      {
        "@type": "Question", 
        "name": "Are the AI-generated tattoo designs suitable for actual tattooing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI generates high-quality concept designs intended for consultation with professional tattoo artists. While the designs are detailed and artistically sound, we recommend working with a professional tattoo artist who can refine the design for optimal tattooing results and ensure it meets technical requirements."
        }
      },
      {
        "@type": "Question",
        "name": "What tattoo styles can the AI create?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Our AI can generate designs in 18+ professional tattoo styles including Traditional, Realistic, Watercolor, Geometric, Minimalist, Japanese, Tribal, and many more. Each style is understood by our AI at a deep level to ensure authentic results."
        }
      },
      {
        "@type": "Question",
        "name": "Is the AI tattoo generator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our basic AI tattoo generator is completely free to use. We also offer premium features for enhanced quality and additional customization options. No registration is required to start creating designs."
        }
      }
    ]
  };

  // Organization Schema - Company information
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    "name": "Tattoo Ideas Generator",
    "url": url,
    "logo": `${url}/logo.png`,
    "foundingDate": "2024",
    "description": "Leading provider of AI-powered tattoo design generation technology, combining artificial intelligence with deep understanding of tattoo artistry.",
    "sameAs": [
      "https://twitter.com/tattooideagen",
      "https://facebook.com/tattooideagenerator", 
      "https://instagram.com/tattooideagen"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@tattoo-ideas-generator.com",
      "availableLanguage": ["English", "Spanish", "French"]
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Artificial Intelligence",
      "Tattoo Design", 
      "Digital Art",
      "Machine Learning",
      "Creative Technology"
    ]
  };

  const allSchemas = [
    webApplicationSchema,
    softwareApplicationSchema,
    serviceSchema,
    aiMethodologySchema,
    faqSchema,
    organizationSchema
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  );
};

export default SEOStructuredData; 