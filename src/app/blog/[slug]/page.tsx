import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogPostBySlug } from '@/data/blog-posts';
import { Metadata } from 'next';
import Script from 'next/script';

// 动态生成元数据
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The article you are looking for does not exist or has been moved.'
    };
  }
  
  return {
    title: `${post.title} | Tattoo Ideas Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://yourdomain.com/blog/${post.slug}`,
      images: [
        {
          url: `https://yourdomain.com${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`https://yourdomain.com${post.image}`]
    },
    alternates: {
      canonical: `https://yourdomain.com/blog/${post.slug}`
  }
};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  // If post doesn't exist, we could redirect or show a 404
  if (!post) {
    return (
      <main className="min-h-screen flex flex-col pt-20 bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/blog" className="text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // 生成结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": `https://yourdomain.com${post.image}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Tattoo Generator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdomain.com/logo.png"
      }
    },
    "description": post.excerpt,
    "keywords": post.tags.join(', '),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/blog/${post.slug}`
    }
  };

  // Function to convert markdown-like content to JSX
  const renderContent = (content: string) => {
    // Very basic markdown parsing for demonstration
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      // Handle subheaders
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      // Handle lists
      if (paragraph.includes('- ')) {
        const listItems = paragraph.split('\n');
        return (
          <ul key={index} className="list-disc pl-6 my-4 space-y-2">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-muted-foreground">
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-muted-foreground mb-4">
          {paragraph}
        </p>
      );
    });
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
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary mb-6 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                </div>
              </div>
              
              <div className="ml-auto flex items-center">
                <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
              <Image 
                src={post.image} 
                alt={`${post.title} - Featured image showing tattoo ideas`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="relative py-8 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {post.content.map((paragraph) => renderContent(paragraph))}
            </article>
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/blog/tag/${tag.replace(/\s+/g, '-').toLowerCase()}`}
                    className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Articles */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/20">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                  <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative h-40 overflow-hidden">
                      <Image 
                        src={relatedPost.image} 
                        alt={`${relatedPost.title} - Related tattoo ideas article`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Create Your Own Tattoo Design?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Try our AI tattoo generator to bring your ideas to life. From phoenix tattoos to hand tattoos, create a custom design that&apos;s uniquely yours.
              </p>
              <Link 
                href="/#generator" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Create Your Tattoo Design
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 