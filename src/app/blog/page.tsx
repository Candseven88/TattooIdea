import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SectionHeading } from '@/components/ui/section-heading';
import { blogPostsSummary, BlogPostSummary } from '@/data/blogPosts';
import { Metadata } from 'next';
import Script from 'next/script';

// 生成元数据
export const metadata: Metadata = {
  title: 'Tattoo Ideas Blog - Inspiration and Guides for Your Next Ink',
  description: 'Explore our collection of tattoo ideas, designs, and inspiration. From phoenix tattoos to hand tattoos, find the perfect design for your next ink.',
  keywords: 'tattoo ideas, tattoo designs, tattoo inspiration, phoenix tattoo, hand tattoos, tattoo styles, AI tattoo generator',
  openGraph: {
    title: 'Tattoo Ideas Blog - Inspiration and Guides for Your Next Ink',
    description: 'Explore our collection of tattoo ideas, designs, and inspiration for both men and women. Find the perfect design for your next tattoo.',
    type: 'website',
    url: 'https://yourdomain.com/blog',
    images: [
      {
        url: 'https://yourdomain.com/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Tattoo Ideas Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tattoo Ideas Blog - Inspiration and Guides for Your Next Ink',
    description: 'Explore our collection of tattoo ideas, designs, and inspiration for both men and women. Find the perfect design for your next tattoo.',
    images: ['https://yourdomain.com/og-image-blog.jpg']
  },
  alternates: {
    canonical: 'https://yourdomain.com/blog'
  }
};

export default function Blog() {
  // 生成结构化数据 - 博客列表
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "Tattoo Ideas Blog",
    "description": "Explore our collection of tattoo ideas, designs, and inspiration for both men and women.",
    "url": "https://yourdomain.com/blog",
    "image": "https://yourdomain.com/og-image-blog.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "AI Tattoo Generator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdomain.com/logo.png"
      }
    },
    "blogPost": blogPostsSummary.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "image": `https://yourdomain.com${post.image}`,
      "url": `https://yourdomain.com/blog/${post.slug}`
    }))
  };

  return (
    <main className="min-h-screen flex flex-col pt-20 bg-white relative">
      {/* 添加结构化数据 */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 bg-white pointer-events-none"></div>
      <div className="fixed top-0 left-0 right-0 h-[500px] -z-10 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 right-0 h-[300px] -z-10 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                Tattoo Ideas Blog
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Explore our collection of articles on tattoo ideas, designs, and inspiration for both men and women. From phoenix tattoos to hand tattoos, find the perfect design for your next ink.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="Latest Articles" 
            description="Read our latest insights on tattoo design trends, ideas, and inspiration"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogPostsSummary.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Topics Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/20">
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="Popular Tattoo Topics" 
            description="Explore our most read categories and find inspiration for your next tattoo"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <TopicCard 
              title="Phoenix Tattoos" 
              description="Symbolic designs representing rebirth and transformation"
              image="/inspiration/Burning Wing Of A Phoenix Rising From.webp"
              link="/#gallery"
            />
            <TopicCard 
              title="Hand Tattoos" 
              description="Small, elegant designs for fingers, wrists, and palms"
              image="/inspiration/Compass.webp"
              link="/#gallery"
            />
            <TopicCard 
              title="Tattoos for Women" 
              description="Feminine designs from delicate to bold statements"
              image="/inspiration/Two Rose Wrapped One Black One Red.webp"
              link="/#gallery"
            />
            <TopicCard 
              title="Tattoos for Men" 
              description="Masculine designs with meaning and visual impact"
              image="/inspiration/Wolf With Blue Eyes On Armor Tattoo.webp"
              link="/#gallery"
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Tattoo Ideas in Your Inbox</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest tattoo inspiration, design trends, and tips. Perfect for tattoo enthusiasts looking for fresh ideas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-md border border-input bg-background"
                />
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

// Blog Post Card Component
function BlogPostCard({ post }: { post: BlogPostSummary }) {
  return (
    <div className="group h-full flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          <div className="relative h-56 overflow-hidden">
            <Image 
              src={post.image} 
              alt={`${post.title} - Tattoo ideas blog post featured image`}
              width={600}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded">
              {post.category}
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
            
            <div className="mt-auto flex items-center text-primary font-medium">
              <span>Read more</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Topic Card Component
function TopicCard({ title, description, image, link }: { title: string; description: string; image: string; link: string }) {
  return (
    <Link href={link}>
      <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative h-40 overflow-hidden">
          <Image 
            src={image} 
            alt={`${title} - Tattoo ideas category`}
            width={400}
            height={300}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-bold mb-1 hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
} 