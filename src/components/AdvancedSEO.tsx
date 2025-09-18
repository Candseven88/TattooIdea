import Script from 'next/script';
import Head from 'next/head';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  imageUrl?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export default function AdvancedSEO({
  title = "Creative Tattoo Ideas Generator | AI Tattoo Design Tool",
  description = "Discover unique tattoo ideas for men and women. Our AI tattoo generator creates custom designs from phoenix tattoos to hand tattoos.",
  canonical = "https://www.tattooidea.tattoo",
  imageUrl = "https://www.tattooidea.tattoo/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Tattoo Design Team",
  tags = ["tattoo ideas", "ai tattoo generator", "tattoo design"]
}: AdvancedSEOProps) {
  
  // 网站组织结构化数据
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Tattoo Generator",
    "alternateName": "TattooIdea",
    "url": "https://www.tattooidea.tattoo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.tattooidea.tattoo/logo.png",
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://twitter.com/aitattoogen",
      "https://facebook.com/aitattoogen",
      "https://instagram.com/aitattoogen",
      "https://pinterest.com/aitattoogen"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-TATTOO",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish", "French"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "Global"
    },
    "description": "Leading AI-powered tattoo design generator helping artists and clients create unique, personalized tattoo ideas.",
    "foundingDate": "2023",
    "numberOfEmployees": "10-50",
    "industry": "Artificial Intelligence, Design, Art"
  };

  // 网站结构化数据
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Tattoo Generator",
    "alternateName": "TattooIdea",
    "url": "https://www.tattooidea.tattoo",
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "AI Tattoo Generator"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.tattooidea.tattoo/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "CreateAction",
        "name": "Generate Tattoo Design",
        "description": "Create custom tattoo designs using AI",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.tattooidea.tattoo/#generator"
        }
      }
    ],
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "AI Tattoo Generator",
      "applicationCategory": "Design Software",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  };

  // 服务结构化数据
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Tattoo Design Generation",
    "description": "Professional AI-powered tattoo design service for custom tattoo creation",
    "provider": {
      "@type": "Organization",
      "name": "AI Tattoo Generator"
    },
    "serviceType": "Digital Design Service",
    "audience": {
      "@type": "Audience",
      "audienceType": "Tattoo enthusiasts, artists, and people seeking custom designs"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2023-01-01",
      "priceValidUntil": "2025-12-31"
    },
    "category": "Art & Design",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tattoo Styles",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Phoenix Tattoo Design"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Hand Tattoo Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Minimalist Tattoo Design"
          }
        }
      ]
    }
  };

  // FAQ结构化数据
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the AI tattoo generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI tattoo generator uses advanced machine learning to analyze your description and create custom tattoo designs. Simply describe your idea, choose a style, and our AI will generate unique tattoo ideas tailored to your preferences."
        }
      },
      {
        "@type": "Question",
        "name": "What types of tattoo ideas can I generate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can generate any type of tattoo design, including popular styles like phoenix tattoos, minimalist designs, and hand tattoos. Our AI can create tattoo ideas for both men and women across multiple styles and placements."
        }
      },
      {
        "@type": "Question",
        "name": "Are the tattoo designs ready to use at a tattoo shop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The designs generated are concept visualizations that serve as inspiration. We recommend taking your favorite design to a professional tattoo artist who can refine it based on their expertise and your specific needs."
        }
      }
    ]
  };

  // BreadcrumbList结构化数据
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.tattooidea.tattoo"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "AI Tattoo Generator",
        "item": "https://www.tattooidea.tattoo/#generator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Blog",
        "item": "https://www.tattooidea.tattoo/blog"
      }
    ]
  };

  return (
    <>
      {/* 组织结构化数据 */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* 网站结构化数据 */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />

      {/* 服务结构化数据 */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />

      {/* FAQ结构化数据 */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* 面包屑结构化数据 */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* 高级Meta标签 */}
      <Head>
        {/* 搜索引擎验证 */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <meta name="baidu-site-verification" content="your-baidu-verification-code" />

        {/* 高级Robot指令 */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />

        {/* 语言和地区 */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />

        {/* 内容相关 */}
        <meta name="subject" content="AI Tattoo Design and Ideas" />
        <meta name="topic" content="Tattoo Design, Artificial Intelligence, Art" />
        <meta name="summary" content={description} />
        <meta name="classification" content="Art, Design, Technology" />
        <meta name="category" content="Design Software" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* 技术信息 */}
        <meta name="revisit-after" content="1 day" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="content-language" content="en-US" />
        
        {/* 链接到humans.txt */}
        <link type="text/plain" rel="author" href="/humans.txt" />
        
        {/* DNS预连接优化 */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.openai.com" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
    </>
  );
} 