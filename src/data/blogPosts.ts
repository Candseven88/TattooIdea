// Blog post summary interface
export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
}

// Blog post detailed information interface
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
  content: string[];
  relatedPosts: RelatedPost[];
}

// Related post interface
export interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  image: string;
}

// Blog post summary data
export const blogPostsSummary: BlogPostSummary[] = [
  {
    id: '1',
    slug: 'phoenix-tattoo-ideas',
    title: 'Phoenix Tattoo Ideas: Symbolism and Designs',
    excerpt: 'Explore the powerful symbolism behind phoenix tattoos and discover inspiring design ideas for your next ink.',
    date: 'June 15, 2023',
    author: 'Tattoo Design Team',
    category: 'Tattoo Symbolism',
    image: '/blogs/Phoenix_Rising_From_Ashes_-_Sketch.jpg',
    tags: ['phoenix tattoo', 'tattoo ideas', 'tattoo designs', 'symbolic tattoos']
  },
  {
    id: '2',
    slug: 'creative-hand-tattoos',
    title: 'Creative Hand Tattoo Ideas and Inspiration',
    excerpt: 'Discover unique and creative hand tattoo designs that make a statement, from small symbols to elaborate patterns.',
    date: 'July 3, 2023',
    author: 'Tattoo Design Team',
    category: 'Placement Ideas',
    image: '/blogs/Female_Japanese_Foo_dog_-_Minimalist.jpg',
    tags: ['hand tattoos', 'finger tattoos', 'small tattoo ideas', 'tattoo designs']
  },
  {
    id: '3',
    slug: 'tattoo-ideas-for-women',
    title: 'Meaningful Tattoo Ideas for Women in 2023',
    excerpt: 'Explore a collection of meaningful and beautiful tattoo ideas designed specifically for women.',
    date: 'August 12, 2023',
    author: 'Tattoo Design Team',
    category: 'Women\'s Tattoos',
    image: '/blogs/Owl_Sitting_On_Moon_With_Stars_-_Geometric.jpg',
    tags: ['tattoos for women', 'tattoo ideas for women', 'thigh tattoos', 'lotus flower tattoo']
  },
  {
    id: '4',
    slug: 'tattoo-ideas-for-men',
    title: 'Bold and Meaningful Tattoo Ideas for Men',
    excerpt: 'From tribal designs to modern minimalist tattoos, discover tattoo ideas that resonate with men.',
    date: 'September 5, 2023',
    author: 'Tattoo Design Team',
    category: 'Men\'s Tattoos',
    image: '/blogs/Realistic_wolf_howling_-_Realistic.jpg',
    tags: ['tattoos for men', 'forearm tattoos for men', 'neck tattoos for men', 'tribal tattoos']
  },
  {
    id: '5',
    slug: 'ai-tattoo-generator-revolution',
    title: 'How AI is Revolutionizing Tattoo Design',
    excerpt: 'Learn how artificial intelligence is changing the way tattoo designs are created and customized.',
    date: 'October 20, 2023',
    author: 'Tattoo Design Team',
    category: 'Technology',
    image: '/blogs/Realistic_eagle_with_spread_wings_-_Black_and_White.jpg',
    tags: ['ai tattoo generator', 'tattoo ai', 'tattoo generator', 'tattoo design']
  },
  {
    id: '6',
    slug: 'finding-perfect-tattoo-style',
    title: 'Finding Your Perfect Tattoo Style: A Comprehensive Guide',
    excerpt: 'Navigate through different tattoo styles to find the one that best expresses your personality and aesthetic preferences.',
    date: 'November 8, 2023',
    author: 'Tattoo Design Team',
    category: 'Tattoo Styles',
    image: '/blogs/Owl_Sitting_On_Moon_With_Stars_-_Geometric.jpg',
    tags: ['tattoo styles', 'tattoo design', 'tattoo ideas', 'tattoo guide']
  },
  {
    id: '7',
    slug: 'legionnaires-lyme-disease-tattoo-safety',
    title: 'Tattoo Health Safety: Understanding Legionnaires\' Disease and Lyme Disease Risks',
    excerpt: 'Learn about the potential risks of Legionnaires\' disease and Lyme disease related to tattoos, and discover how to protect yourself while still enjoying beautiful body art.',
    date: 'August 1, 2023',
    author: 'Tattoo Health & Safety Team',
    category: 'Tattoo Safety',
    image: '/blogs/Realistic_eagle_with_spread_wings_-_Black_and_White.jpg',
    tags: ['tattoo safety', 'tattoo infections', 'legionnaires disease', 'lyme disease', 'tattoo health']
  },
  {
    id: '8',
    slug: 'ambigram-tattoo-generator-guide',
    title: 'Ambigram Tattoo Generator: The Ultimate Guide to Creating Dual-Reading Designs',
    excerpt: 'Discover how ambigram tattoo generators work, explore the art and science behind ambigrams, and learn how to create stunning designs that read differently when viewed from different angles.',
    date: 'August 3, 2023',
    author: 'Tattoo Design Team',
    category: 'Tattoo Technology',
    image: '/blogs/ambigram-design.png',
    tags: ['ambigram generator', 'ambigram tattoo', 'tattoo generator', 'custom tattoo designs', 'name tattoos']
  },
  {
    id: '9',
    slug: 'ai-photo-editor-guide',
    title: 'AI Photo Editor Revolution: Transform Your Tattoo Design Process',
    excerpt: 'Discover how AI photo editing tools are revolutionizing tattoo design visualization, helping artists and clients perfect their ideas before committing to ink.',
    date: 'January 15, 2025',
    author: 'Tattoo Design Team',
    category: 'Technology',
    image: '/blogs/ambigram-design.png',
    tags: ['ai photo editor', 'tattoo design', 'photo editing', 'ai tools', 'tattoo visualization']
  }
];

// Fixed related posts data
export const fixedRelatedPosts: RelatedPost[] = [
  {
    id: '1',
    slug: 'phoenix-tattoo-ideas',
    title: 'Phoenix Tattoo Ideas: Symbolism and Designs',
    image: '/blogs/Phoenix_Rising_From_Ashes_-_Sketch.jpg'
  },
  {
    id: '2',
    slug: 'creative-hand-tattoos',
    title: 'Creative Hand Tattoo Ideas and Inspiration',
    image: '/blogs/Female_Japanese_Foo_dog_-_Minimalist.jpg'
  },
  {
    id: '3',
    slug: 'tattoo-ideas-for-women',
    title: 'Meaningful Tattoo Ideas for Women in 2023',
    image: '/blogs/Owl_Sitting_On_Moon_With_Stars_-_Geometric.jpg'
  }
];

// Get blog post summary by slug
export function getBlogPostSummaryBySlug(slug: string): BlogPostSummary | undefined {
  return blogPostsSummary.find(post => post.slug === slug);
}

// Get related posts
export function getRelatedPosts(slug: string): RelatedPost[] {
  // For simplicity, return fixed related posts excluding the current one
  return fixedRelatedPosts.filter(post => post.slug !== slug);
} 