"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyleGallery from '@/components/StyleGallery';
import InspirationGallery from '@/components/InspirationGallery';
import TattooForm from '@/components/TattooForm';
import TattooResult from '@/components/TattooResult';
import SEOStructuredData from '@/components/SEOStructuredData';
import { SectionHeading } from '@/components/ui/section-heading';
import { FeatureCard } from '@/components/ui/feature-card';
import { ParsedInput } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [designUrl, setDesignUrl] = useState('');
  const [realisticUrl, setRealisticUrl] = useState('');
  const [parsedInput, setParsedInput] = useState<ParsedInput | null>(null);
  const [apiEnabled] = useState(process.env.NEXT_PUBLIC_API_ENABLED === 'true');
  // 添加生成状态
  const [isGenerating, setIsGenerating] = useState(false);
  // 添加浮动按钮可见状态
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    // 平滑滚动到生成器部分
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerate = (designUrl: string, realisticUrl: string, parsedInput: ParsedInput | null) => {
    setDesignUrl(designUrl);
    setRealisticUrl(realisticUrl);
    setParsedInput(parsedInput);
    setIsGenerating(false);
  };
  
  // 开始生成过程，清除之前的结果
  const handleStartGeneration = () => {
    setIsGenerating(true);
    // 清除之前的结果，但保留parsedInput以便在TattooResult中显示加载动画
    setDesignUrl('');
    setRealisticUrl('');
  };

  // 监听滚动，控制浮动按钮显示
  useEffect(() => {
    const handleScroll = () => {
      const generatorElement = document.getElementById('generator');
      if (generatorElement) {
        const rect = generatorElement.getBoundingClientRect();
        // 当generator区域不在视野中时显示浮动按钮
        const isGeneratorVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setShowFloatingButton(!isGeneratorVisible && window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* SEO Structured Data */}
      <SEOStructuredData />
      
      <main className="min-h-screen flex flex-col pt-20 bg-white relative">
        {/* 背景装饰 */}
        <div className="fixed inset-0 -z-10 bg-white pointer-events-none"></div>
        <div className="fixed top-0 left-0 right-0 h-[500px] -z-10 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 right-0 h-[300px] -z-10 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>
        
        <Header />
      
      {/* Modern Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            {/* Logo and Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-8 flex flex-col items-center"
            >
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 opacity-75 blur-lg"></div>
                <div className="relative h-20 w-20 rounded-full bg-black flex items-center justify-center shadow-xl">
                  <svg 
                    width="36" 
                    height="36" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                    aria-label="Professional tattoo design AI technology"
                  >
                    <path 
                      d="M7.5 4.5C7.5 3.12 8.62 2 10 2C11.38 2 12.5 3.12 12.5 4.5V6H7.5V4.5Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M16.5 4.5C16.5 3.12 15.38 2 14 2C12.62 2 11.5 3.12 11.5 4.5V6H16.5V4.5Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M3 11L5 19.5C5 19.5 5.5 22 12 22C18.5 22 19 19.5 19 19.5L21 11" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M3 11H21V7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7V11Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Professional Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/50 rounded-full text-sm font-medium text-purple-700 mb-2">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Professional-Grade AI Technology
              </div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                AI Tattoo Design
              </span>
              <br />
              <span className="text-gray-900">Made Professional</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl leading-relaxed"
            >
              Transform your ideas into stunning tattoo designs using our{' '}
              <span className="font-semibold text-purple-700">expert-trained AI</span>. 
              Perfect for consultation with professional tattoo artists.
            </motion.p>
            
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl"
            >
              <div className="flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">18+ Styles</div>
                    <div className="text-gray-600 text-xs">Expert curated</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">AI Powered</div>
                    <div className="text-gray-600 text-xs">Advanced models</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Free to Use</div>
                    <div className="text-gray-600 text-xs">No registration</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <a 
                href="#generator" 
                className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600"></span>
                <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-600"></span>
                <span className="relative flex items-center">
                  Start Creating Your Design
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </a>
            </motion.div>
            
            {/* AI Disclosure - Elegant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <button 
                className="group inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => {
                  const element = document.getElementById('ai-methodology');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                AI-generated designs with transparent methodology
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced Decorative Elements */}
        <div className="absolute -bottom-8 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        <div className="absolute -top-24 left-1/4 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-12 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-24 right-1/3 w-48 h-48 bg-pink-100/30 rounded-full blur-3xl animate-pulse-slow" />
      </section>
      
      {/* MAIN GENERATOR SECTION - Primary E-E-A-T focused functionality */}
      <section id="generator" className="py-12 relative overflow-hidden bg-gradient-to-br from-blue-50/20 to-white" itemScope itemType="https://schema.org/SoftwareApplication">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3" itemProp="name">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                AI Tattoo Design Generator
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" itemProp="description">
              Create custom tattoo designs using our professional AI system. Describe your vision, select your preferred style, and receive unique, high-quality tattoo concepts designed specifically for you.
            </p>
            
            {/* Expertise and Authority Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                AI-Powered Technology
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Professional Quality
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Multiple Styles Available
              </div>
            </div>
          </motion.header>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <TattooForm 
              onGenerate={handleGenerate} 
              onStartGeneration={handleStartGeneration}
            />
            
            <div id="tattoo-result" className="mt-8">
              {/* 总是渲染TattooResult组件，但在没有结果时显示占位符 */}
              <TattooResult 
                designUrl={designUrl} 
                realisticUrl={realisticUrl} 
                parsedInput={parsedInput}
                apiEnabled={apiEnabled}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section - Transparency and Expertise */}
      <section id="ai-methodology" className="py-16 relative overflow-hidden bg-gradient-to-br from-white to-blue-50/10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                How Our AI Tattoo Design Process Works
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent, professional-grade AI technology meets artistic expertise to create your perfect tattoo design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis & Understanding</h3>
              <p className="text-muted-foreground">
                Our advanced AI system analyzes your description using natural language processing trained on tattoo design principles and artistic concepts.
              </p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Design Generation</h3>
              <p className="text-muted-foreground">
                Multiple AI models work together to create designs that respect tattoo artistry traditions while bringing your unique vision to life.
              </p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality & Refinement</h3>
              <p className="text-muted-foreground">
                Each design undergoes quality checks and refinements to ensure professional standards suitable for tattoo artist consultation.
              </p>
            </motion.article>
          </div>

          {/* AI Technology Disclosure - Beautiful & Readable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  AI Technology Transparency
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">About Our AI Technology</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We believe in complete transparency about how our AI creates tattoo designs. Here's exactly how our technology works.
                </p>
              </div>

              {/* Technology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Models Used</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our system combines multiple state-of-the-art AI models including advanced image generation and natural language processing technologies.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Training & Expertise</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our AI has been trained on artistic principles, tattoo design best practices, and thousands of professional tattoo examples to ensure quality and appropriateness.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Human Oversight</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        While AI generates the initial designs, our system includes quality controls and recommendations for professional tattoo artist consultation before actual tattooing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Purpose</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        This tool is designed to help users visualize and refine their tattoo ideas, not to replace professional tattoo artists but to enhance the design consultation process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ethics Statement */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Commitment</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We're committed to responsible AI development and encourage all users to consult with professional, licensed tattoo artists before getting any tattoo. Our AI-generated designs are meant to inspire and assist in the creative process, always with human expertise as the final step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Styles Section - Expert curated tattoo style guide */}
      <section id="styles" className="py-16 relative overflow-hidden" itemScope itemType="https://schema.org/CreativeWork">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4" itemProp="name">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                Professional Tattoo Style Guide
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" itemProp="description">
              Explore professionally curated tattoo styles, each with unique characteristics and artistic heritage. Our AI understands the nuances of each style to create authentic, high-quality designs that honor traditional tattoo artistry.
            </p>
            
            {/* Expertise indicator */}
            <div className="flex justify-center items-center mt-4 text-sm text-muted-foreground">
              <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Expert-curated collection based on traditional tattoo artistry
            </div>
          </motion.header>
          
          <StyleGallery selectedStyle={selectedStyle} onStyleSelect={handleStyleSelect} />
        </div>
      </section>
      
      {/* Inspiration Gallery */}
      <section id="inspiration" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-white pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="Design Inspiration Gallery" 
            description="Explore our collection of stunning tattoo designs for inspiration and creative ideas."
          />
          
          <InspirationGallery />
        </div>
      </section>
      
      {/* Features Section - Trust and Authority Focused */}
      <section className="py-12 relative overflow-hidden" itemScope itemType="https://schema.org/Service">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3" itemProp="name">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                Professional-Grade AI Tattoo Design Platform
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" itemProp="description">
              Trusted by thousands of users worldwide, our platform combines cutting-edge AI technology with deep understanding of tattoo artistry.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10"
              itemScope itemType="https://schema.org/DigitalDocument"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" itemProp="name">Expert AI Training</h3>
              <p className="text-muted-foreground" itemProp="description">
                Our AI models are trained on thousands of professional tattoo designs and artistic principles, ensuring authentic and high-quality results that respect tattoo traditions.
              </p>
            </motion.article>
            
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10"
              itemScope itemType="https://schema.org/DigitalDocument"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" itemProp="name">Realistic Body Placement</h3>
              <p className="text-muted-foreground" itemProp="description">
                Advanced visualization technology allows you to see exactly how your tattoo will look on different body parts, helping you make informed decisions before visiting a tattoo artist.
              </p>
            </motion.article>
            
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10"
              itemScope itemType="https://schema.org/DigitalDocument"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" itemProp="name">Comprehensive Style Library</h3>
              <p className="text-muted-foreground" itemProp="description">
                Access to 18+ professionally curated tattoo styles, from traditional to contemporary, each with authentic characteristics and artistic heritage that our AI understands and respects.
              </p>
            </motion.article>
          </div>

          {/* Trust and Safety Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-800">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Designed for consultation with professional tattoo artists
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How To Use Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-blue-50/30 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="How To Use Our Tattoo Generator" 
            description="Follow this simple guide to create your perfect tattoo design in just a few steps."
          />
          
          <div className="max-w-4xl mx-auto mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-primary/10"
            >
              <div className="p-2 sm:p-4 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 text-center">Product Usage Guide</h3>
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <video 
                    className="w-full h-full object-cover rounded-md"
                    controls
                    poster="/videos/demo-poster.jpg"
                    preload="metadata"
                    muted
                  >
                    <source src="/videos/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Follow the steps above to create your custom tattoo design. Describe your idea, select your preferences, and let our AI do the rest!
                  </p>
                  <a 
                    href="#generator" 
                    className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
                  >
                    Try It Now
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="Frequently Asked Questions" 
            description="Get answers to common questions about our AI tattoo generator and finding the perfect tattoo ideas."
          />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">How does the AI tattoo generator work?</h3>
              <p className="text-muted-foreground">Our AI tattoo generator uses advanced machine learning to analyze your description and create custom tattoo designs. Simply describe your idea, choose a style, and our AI will generate unique tattoo ideas tailored to your preferences.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">What types of tattoo ideas can I generate?</h3>
              <p className="text-muted-foreground">You can generate any type of tattoo design, including popular styles like phoenix tattoos, minimalist designs, and hand tattoos. Our AI can create tattoo ideas for both men and women across multiple styles and placements.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">Are the tattoo designs ready to use at a tattoo shop?</h3>
              <p className="text-muted-foreground">The designs generated are concept visualizations that serve as inspiration. We recommend taking your favorite design to a professional tattoo artist who can refine it based on their expertise and your specific needs.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">Can I see how tattoos will look on different body parts?</h3>
              <p className="text-muted-foreground">Yes! Our realistic preview mode lets you visualize how your tattoo design will look on different body placements, from forearms to hand tattoos. This helps you make a more informed decision about your tattoo placement.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">How do I choose between tattoo ideas for men vs. women?</h3>
              <p className="text-muted-foreground">While many tattoo designs are suitable for everyone, our generator allows you to specify gender preferences to tailor the design accordingly. This helps with body-specific placements and stylistic preferences that might differ between tattoo ideas for men and women.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Streamlined */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center relative"
        >
          <div className="absolute -top-16 left-1/4 w-48 h-48 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-16 right-1/4 w-48 h-48 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-3 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">Ready to Create Your Dream Tattoo?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">Jump back to our generator and start creating your perfect tattoo design.</p>
          <a 
            href="#generator" 
            className="relative group overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-md text-lg font-medium text-white transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600"></span>
            <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink-600 via-blue-500 to-purple-600"></span>
            <span className="relative flex items-center">
              ↑ Back to Generator
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </span>
          </a>
        </motion.div>
      </section>
      
      {/* Floating Quick Access Button */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <a
              href="#generator"
              className="relative group overflow-hidden inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              aria-label="Jump to Tattoo Generator"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 animate-pulse"></span>
              <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink-600 via-blue-500 to-purple-600"></span>
              <span className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
            </a>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Create Tattoo Design
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
              <Footer />
      </main>
    </>
  );
}
