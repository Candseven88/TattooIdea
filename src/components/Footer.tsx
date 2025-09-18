"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Tattoo Ideas Generator</h3>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover your perfect tattoo design with our AI tattoo generator. From phoenix tattoos to hand tattoos, we help bring your tattoo ideas to life for both men and women.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/#styles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tattoo Styles</Link></li>
              <li><Link href="/#inspiration" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tattoo Ideas Gallery</Link></li>
              <li><Link href="/#generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Tattoo Generator</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Popular Tattoo Ideas</h4>
            <ul className="space-y-2">
              <li><Link href="/blog/phoenix-tattoo-ideas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Phoenix Tattoo Ideas</Link></li>
              <li><Link href="/blog/creative-hand-tattoos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hand Tattoos Guide</Link></li>
              <li><Link href="/blog/tattoo-ideas-for-women" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tattoo Ideas for Women</Link></li>
              <li><Link href="/blog/tattoo-ideas-for-men" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tattoo Ideas for Men</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog/finding-perfect-tattoo-style" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tattoo Style Guide</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Body Placement Tips</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tattoo Aftercare</Link></li>
              <li><Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tattoo Design FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tattoo Ideas Generator. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 