# 博客文章系统

## 文件结构

博客文章系统由以下部分组成：

1. `/src/data/blogPosts.ts` - 定义了博客文章的类型接口和摘要数据
   - `BlogPostSummary` - 博客文章摘要接口
   - `BlogPost` - 博客文章详细信息接口
   - `RelatedPost` - 相关文章接口
   - `blogPostsSummary` - 所有博客文章的摘要数据
   - 工具函数：`getBlogPostSummaryBySlug`, `getRelatedPosts`

2. `/src/data/blog-posts/index.ts` - 导出所有博客文章和工具函数
   - `blogPosts` - 所有博客文章的集合
   - 工具函数：`getBlogPostBySlug`, `getAllBlogPosts`

3. 单独的博客文章文件 - 每篇博客文章都有自己的文件
   - `/src/data/blog-posts/phoenix-tattoo-ideas.ts`
   - `/src/data/blog-posts/creative-hand-tattoos.ts`
   - 等等...

## SEO 优化

每个博客文章都包含以下SEO元素：

1. 元数据（Metadata）
   - 标题（title）
   - 描述（description）
   - 关键词（keywords）
   - Open Graph 数据
   - Twitter 卡片数据

2. 结构化数据（Structured Data）
   - 使用 Schema.org 的 BlogPosting 类型
   - 包含作者、发布日期、图片等信息

3. 语义化HTML
   - 使用 `<article>` 标签包裹文章内容
   - 使用 `<h1>`, `<h2>`, `<h3>` 等标题标签
   - 图片包含 alt 属性

## 简化的博客系统

为了优化性能和部署体验，我们对博客系统进行了以下简化：

1. **移除作者头像** - 简化了作者信息的显示，只保留名称和日期
2. **简化内容渲染** - 使用基本的Markdown解析，避免复杂的客户端渲染
3. **优化图片** - 使用Next.js的Image组件优化图片加载
4. **静态生成** - 所有博客页面都是静态生成的，提高加载速度
5. **内部链接优化** - "Popular Tattoo Topics"部分链接到主页的Gallery部分，增加内部链接

## 部署考虑

在Vercel上部署时，这种简化的博客系统有以下优势：

1. **减少API调用** - 所有内容都是静态的，不需要额外的API调用
2. **更快的构建时间** - 简化的内容结构使构建更快
3. **更低的带宽使用** - 优化的图片和静态内容减少带宽使用
4. **更好的缓存** - 静态内容可以更有效地被CDN缓存

## 如何添加新文章

1. 在 `/src/data/blog-posts/` 目录下创建新的文件，例如 `new-article.ts`
2. 导出符合 `BlogPost` 接口的对象
3. 在 `/src/data/blog-posts/index.ts` 中导入并添加到 `blogPosts` 对象
4. 在 `/src/data/blogPosts.ts` 的 `blogPostsSummary` 数组中添加文章摘要

示例：

```typescript
// /src/data/blog-posts/new-article.ts
import { getRelatedPosts } from '../blogPosts';

const newArticle = {
  id: '7',
  slug: 'new-article-slug',
  title: 'New Article Title',
  excerpt: 'Brief description of the article',
  date: 'December 1, 2023',
  author: 'Tattoo Design Team',
  category: 'Category',
  image: '/path/to/image.jpg',
  tags: ['tag1', 'tag2', 'tag3'],
  content: [
    '## First Section Heading',
    'First paragraph content...',
    '## Second Section Heading',
    'Second paragraph content...',
    // 更多内容...
  ],
  get relatedPosts() {
    return getRelatedPosts(this.id, this.tags);
  }
};

export default newArticle;
``` 