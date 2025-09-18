#!/usr/bin/env node

/**
 * SEO优化和搜索引擎提交脚本
 * 使用方法: node scripts/seo-boost.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.tattooidea.tattoo';

// 主要搜索引擎提交URL
const SEARCH_ENGINES = {
  google: 'https://www.google.com/ping?sitemap=',
  bing: 'https://www.bing.com/ping?sitemap=',
  yandex: 'https://webmaster.yandex.com/ping?sitemap=',
  baidu: 'https://ping.baidu.com/ping/RPC2', // 百度需要特殊处理
};

// 通知搜索引擎更新Sitemap
function pingSearchEngines() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  
  console.log('🚀 开始通知搜索引擎更新Sitemap...\n');
  
  Object.entries(SEARCH_ENGINES).forEach(([engine, pingUrl]) => {
    if (engine === 'baidu') {
      console.log(`📋 百度提交: 请手动访问 ${pingUrl}`);
      return;
    }
    
    const fullUrl = `${pingUrl}${encodeURIComponent(sitemapUrl)}`;
    
    https.get(fullUrl, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${engine.toUpperCase()}: Sitemap提交成功`);
      } else {
        console.log(`⚠️  ${engine.toUpperCase()}: 提交失败 (状态码: ${res.statusCode})`);
      }
    }).on('error', (err) => {
      console.log(`❌ ${engine.toUpperCase()}: 提交错误 - ${err.message}`);
    });
  });
}

// 生成爬虫友好的URL列表
function generateCrawlableUrls() {
  const urls = [
    '/',
    '/blog',
    '/ambigram',
    '/blog/phoenix-tattoo-ideas',
    '/blog/creative-hand-tattoos',
    '/blog/tattoo-ideas-for-women',
    '/blog/tattoo-ideas-for-men',
    '/blog/ai-tattoo-generator-revolution',
    '/blog/finding-perfect-tattoo-style',
    '/blog/legionnaires-lyme-disease-tattoo-safety',
    '/blog/ambigram-tattoo-generator-guide',
    '/blog/ai-photo-editor-guide',
  ];

  console.log('\n📝 生成爬虫友好的URL列表:');
  console.log('='.repeat(50));
  
  urls.forEach(url => {
    console.log(`${SITE_URL}${url}`);
  });
  
  return urls;
}

// 检查重要SEO文件
function checkSeoFiles() {
  const requiredFiles = [
    'public/robots.txt',
    'public/sitemap.xml',
    'public/humans.txt',
    'public/security.txt',
  ];
  
  console.log('\n🔍 检查SEO文件状态:');
  console.log('='.repeat(30));
  
  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file} - 存在`);
    } else {
      console.log(`❌ ${file} - 缺失`);
    }
  });
}

// 验证结构化数据
function validateStructuredData() {
  console.log('\n🏗️  结构化数据验证提示:');
  console.log('='.repeat(35));
  console.log('请使用以下工具验证结构化数据:');
  console.log('📊 Google结构化数据测试工具: https://search.google.com/test/rich-results');
  console.log('📊 Schema.org验证工具: https://validator.schema.org/');
  console.log('📊 JSON-LD Playground: https://json-ld.org/playground/');
}

// 显示SEO优化建议
function showSeoTips() {
  console.log('\n💡 SEO优化建议:');
  console.log('='.repeat(20));
  console.log('1. 定期更新内容（每周至少1篇博客文章）');
  console.log('2. 优化图片alt标签和文件名');
  console.log('3. 提高页面加载速度');
  console.log('4. 建立高质量外部链接');
  console.log('5. 监控Google Search Console数据');
  console.log('6. 定期检查页面移动端友好性');
  console.log('7. 创建更多长尾关键词内容');
  console.log('8. 增加社交媒体分享');
}

// 主要搜索引擎手动提交链接
function showManualSubmissionLinks() {
  console.log('\n🔗 手动提交搜索引擎链接:');
  console.log('='.repeat(35));
  console.log('Google Search Console: https://search.google.com/search-console');
  console.log('Bing网站管理员工具: https://www.bing.com/webmasters');
  console.log('Yandex网站管理员: https://webmaster.yandex.com/');
  console.log('百度搜索资源平台: https://ziyuan.baidu.com/');
  console.log('DuckDuckGo提交: https://duckduckgo.com/new-crawler');
  console.log('Yahoo (由Bing提供): 通过Bing提交即可');
}

// 显示第三方SEO工具推荐
function showSeoTools() {
  console.log('\n🛠️  推荐SEO工具:');
  console.log('='.repeat(20));
  console.log('免费工具:');
  console.log('- Google Analytics & Search Console');
  console.log('- Bing网站管理员工具');
  console.log('- GTmetrix (页面速度)');
  console.log('- Google PageSpeed Insights');
  console.log('- Schema.org验证工具');
  console.log('');
  console.log('付费工具:');
  console.log('- Ahrefs (关键词&链接分析)');
  console.log('- SEMrush (综合SEO)');
  console.log('- Screaming Frog (网站爬取)');
  console.log('- Moz Pro (SEO监控)');
}

// 主函数
function main() {
  console.log('🎯 TattooIdea SEO优化脚本');
  console.log('='.repeat(40));
  
  // 执行所有检查和提交
  checkSeoFiles();
  generateCrawlableUrls();
  pingSearchEngines();
  validateStructuredData();
  showManualSubmissionLinks();
  showSeoTips();
  showSeoTools();
  
  console.log('\n✨ SEO优化脚本执行完成!');
  console.log('请根据上述建议进行进一步优化。');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  pingSearchEngines,
  generateCrawlableUrls,
  checkSeoFiles,
  validateStructuredData
}; 