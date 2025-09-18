"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SectionHeading } from '@/components/ui/section-heading';
import AmbigramForm from '@/components/AmbigramForm';
import AmbigramResults from '@/components/AmbigramResults';
import { motion } from 'framer-motion';

export default function AmbigramGenerator() {
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);

  const handleGenerate = (designs: string[], mockup?: string) => {
    setGeneratedDesigns(designs);
    setIsGenerating(false);
    
    // If mockup URL is provided, store it
    if (mockup) {
      setMockupUrl(mockup);
    }
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('ambigram-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGeneratedDesigns([]);
    setSelectedDesign(null);
    setMockupUrl(null);
  };

  const handleSelectDesign = (design: string) => {
    setSelectedDesign(design);
    
    // If no mockup URL is set from API, use the default one
    if (!mockupUrl) {
      setMockupUrl(`/mockups/tattoo-arm-mockup.jpg`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col pt-20 bg-white relative">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 bg-white pointer-events-none"></div>
      <div className="fixed top-0 left-0 right-0 h-[500px] -z-10 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 right-0 h-[300px] -z-10 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 opacity-75 blur-lg"></div>
                <div className="relative h-20 w-20 rounded-full bg-black flex items-center justify-center">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                    aria-label="Ambigram icon"
                  >
                    <path 
                      d="M7 20L17 4M7 4L17 20" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M3 12H21" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                Ambigram Tattoo Generator
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl"
            >
              Create stunning ambigram tattoo designs that can be read from multiple perspectives. Perfect for representing two names, words, or concepts in one elegant design.
            </motion.p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        <div className="absolute -top-24 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-12 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-12 right-1/3 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow" />
      </section>
      
      {/* Generator Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="Create Your Ambigram" 
            description="Enter two names or words and our AI will generate unique ambigram designs that can be read from multiple angles."
          />
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <AmbigramForm 
              onGenerate={handleGenerate}
              onStartGeneration={handleStartGeneration}
            />
            
            <div id="ambigram-results" className="mt-16">
              <AmbigramResults 
                designs={generatedDesigns}
                isGenerating={isGenerating}
                onSelectDesign={handleSelectDesign}
                selectedDesign={selectedDesign}
                mockupUrl={mockupUrl}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="What is an Ambigram?" 
            description="Discover the fascinating art of ambigrams and how they create meaningful designs that can be read from multiple perspectives."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md border border-primary/10"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Rotational Symmetry</h3>
              <p className="text-muted-foreground">Ambigrams are designed to be read from different angles, typically when rotated 180 degrees, creating a perfect balance between two words or concepts.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md border border-primary/10"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Artistic Expression</h3>
              <p className="text-muted-foreground">More than just typography, ambigrams are artistic expressions that blend form and meaning, creating visually stunning designs with deep personal significance.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md border border-primary/10"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Perfect for Tattoos</h3>
              <p className="text-muted-foreground">Ambigrams make exceptional tattoo designs, allowing you to represent two important names, words, or concepts in one elegant and meaningful piece of body art.</p>
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
            description="Get answers to common questions about our Ambigram Tattoo Generator."
          />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">What is an ambigram tattoo?</h3>
              <p className="text-muted-foreground">An ambigram tattoo is a design that can be read from multiple perspectives, typically when rotated 180 degrees. It allows you to represent two different words or names in a single artistic design, making it perfect for expressing dual concepts or connections.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">How does the ambigram generator work?</h3>
              <p className="text-muted-foreground">Our ambigram generator uses advanced algorithms to analyze letter forms and create designs that can be read from multiple angles. Simply enter two words or names, select your preferred style, and our AI will generate unique ambigram designs tailored to your input.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">Can I download and use the designs for my tattoo?</h3>
              <p className="text-muted-foreground">Yes! All generated designs can be downloaded in high-resolution formats suitable for tattoo artists. We recommend taking your favorite design to a professional tattoo artist who can adapt it to your specific needs and placement.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-2">What styles of ambigrams are available?</h3>
              <p className="text-muted-foreground">We currently offer Gothic, Classic, Modern, Minimalist, and Decorative styles for ambigram designs. Each style has its own unique characteristics while maintaining the essential ambigram functionality of being readable from multiple perspectives.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 