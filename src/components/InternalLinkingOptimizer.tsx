import Link from 'next/link';
import { blogPostsSummary, BlogPostSummary } from '@/data/blogPosts';

interface InternalLinkingOptimizerProps {
  currentPage?: string;
  excludePost?: string;
}

export default function InternalLinkingOptimizer({ 
  currentPage = '/', 
  excludePost 
}: InternalLinkingOptimizerProps) {
  
  // 获取相关博客文章（排除当前文章）
  const getRelatedPosts = (exclude?: string): BlogPostSummary[] => {
    return blogPostsSummary
      .filter(post => post.slug !== exclude)
      .slice(0, 4);
  };

  // 获取重要页面链接
  const getImportantPages = () => {
    return [
      {
        url: '/',
        title: 'AI Tattoo Generator',
        description: 'Create custom tattoo designs with AI'
      },
      {
        url: '/blog',
        title: 'Tattoo Ideas Blog',
        description: 'Latest tattoo inspiration and guides'
      },
      {
        url: '/ambigram',
        title: 'Ambigram Generator',
        description: 'Create dual-reading text designs'
      },
      {
        url: '/#gallery',
        title: 'Tattoo Gallery',
        description: 'Browse tattoo style examples'
      }
    ];
  };

  const relatedPosts = getRelatedPosts(excludePost);
  const importantPages = getImportantPages().filter(page => page.url !== currentPage);

  return (
    <nav className="internal-linking-optimizer" aria-label="Site Navigation">
      {/* 面包屑导航 */}
      <div className="breadcrumb-navigation mb-6">
        <ol className="flex flex-wrap items-center text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          {currentPage !== '/' && (
            <>
              <li className="mx-2">/</li>
              <li>
                <span className="text-foreground font-medium">
                  {currentPage === '/blog' ? 'Blog' : 
                   currentPage === '/ambigram' ? 'Ambigram Generator' :
                   currentPage.startsWith('/blog/') ? 'Article' : 'Page'}
                </span>
              </li>
            </>
          )}
        </ol>
      </div>

      {/* 重要页面快速导航 */}
      {importantPages.length > 0 && (
        <div className="important-pages mb-8">
          <h3 className="text-lg font-semibold mb-3">Explore More</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {importantPages.map((page) => (
              <Link
                key={page.url}
                href={page.url}
                className="block p-3 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-blue-50/30 transition-all duration-200"
              >
                <h4 className="font-medium text-foreground mb-1">{page.title}</h4>
                <p className="text-sm text-muted-foreground">{page.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 相关文章推荐 */}
      {relatedPosts.length > 0 && (
        <div className="related-articles">
          <h3 className="text-lg font-semibold mb-3">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-4 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-blue-50/30 transition-all duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 主要功能入口 */}
      <div className="main-features mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Try Our Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/#generator"
            className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">AI Tattoo Generator</h4>
              <p className="text-xs text-muted-foreground">Create custom designs</p>
            </div>
          </Link>
          
          <Link
            href="/ambigram"
            className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Ambigram Creator</h4>
              <p className="text-xs text-muted-foreground">Dual-reading text art</p>
            </div>
          </Link>
        </div>
      </div>

      {/* 隐藏的爬虫导航（仅对搜索引擎可见） */}
      <div className="sr-only" aria-hidden="true">
        <h4>Site Navigation for Search Engines</h4>
        <ul>
          <li><Link href="/">AI Tattoo Ideas Generator - Create Custom Tattoo Designs</Link></li>
          <li><Link href="/blog">Tattoo Ideas Blog - Latest Design Inspiration</Link></li>
          <li><Link href="/ambigram">Ambigram Tattoo Generator - Dual Reading Text Designs</Link></li>
          <li><Link href="/blog/phoenix-tattoo-ideas">Phoenix Tattoo Ideas and Symbolism</Link></li>
          <li><Link href="/blog/creative-hand-tattoos">Creative Hand Tattoo Designs</Link></li>
          <li><Link href="/blog/tattoo-ideas-for-women">Meaningful Tattoo Ideas for Women</Link></li>
          <li><Link href="/blog/tattoo-ideas-for-men">Bold Tattoo Ideas for Men</Link></li>
          <li><Link href="/blog/ai-tattoo-generator-revolution">AI Tattoo Design Technology</Link></li>
          <li><Link href="/blog/finding-perfect-tattoo-style">Tattoo Style Guide</Link></li>
          <li><Link href="/blog/ai-photo-editor-guide">AI Photo Editor for Tattoo Design</Link></li>
        </ul>
      </div>
    </nav>
  );
} 