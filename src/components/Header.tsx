"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const [activeSection, setActiveSection] = useState('');
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAmbigramPage = pathname === '/ambigram';
  
  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const moreMenu = document.getElementById('more-menu');
      const moreButton = document.getElementById('more-button');
      if (
        moreMenu && 
        moreButton && 
        !moreMenu.contains(event.target as Node) && 
        !moreButton.contains(event.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    // Only enable scroll detection on homepage
    if (!isHomePage) return;
    
    const handleScroll = () => {
      const sections = ['home', 'generator', 'styles', 'inspiration'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full py-2 sm:py-3 bg-background/95 backdrop-blur-md z-50 border-b border-primary/20 shadow-sm">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                <div className="relative h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-black flex items-center justify-center">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                    aria-label="Tattoo design icon"
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
              <h1 className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600">
                  <span className="hidden sm:inline">Tattoo Ideas Generator</span>
                  <span className="sm:hidden">Tattoo Ideas</span>
                </span>
              </h1>
            </Link>
          </motion.div>
          
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-2"
          >
            {/* Home link */}
                <NavItem 
              href="/" 
              active={isHomePage && activeSection === 'home'} 
              isExternal={true}
                >
              Home
                </NavItem>
            
            {/* Ambigram Generator link - prominently displayed */}
                <NavItem 
              href="/ambigram" 
              active={isAmbigramPage} 
                  isExternal={true}
                >
              Ambigram Generator
            </NavItem>
            
            {/* AI Tattoo Generator link */}
            <NavItem 
              href={isHomePage ? '#generator' : '/#generator'} 
              active={isHomePage && activeSection === 'generator'} 
              isExternal={!isHomePage}
            >
              AI Tattoo Generator
            </NavItem>
            
            {/* More dropdown menu */}
            <div className="relative">
              <button 
                id="more-button"
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  moreMenuOpen 
                    ? 'text-primary-foreground bg-primary/90' 
                    : 'text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              >
                More
                <ChevronDown size={16} className={`transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {moreMenuOpen && (
                <motion.div 
                  id="more-menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-1 py-2 w-48 bg-white rounded-md shadow-lg border border-primary/10 z-50"
                >
                  {/* More menu items */}
                  <DropdownItem 
                    href={isHomePage ? '#styles' : '/#styles'} 
                    active={isHomePage && activeSection === 'styles'}
                    isExternal={!isHomePage}
                  >
                    Tattoo Styles
                  </DropdownItem>
                  
                  <DropdownItem 
                    href={isHomePage ? '#inspiration' : '/#inspiration'} 
                    active={isHomePage && activeSection === 'inspiration'}
                    isExternal={!isHomePage}
                  >
                    Inspiration Gallery
                  </DropdownItem>
                  
                  <DropdownItem 
                    href="/teaspill" 
                    active={pathname.startsWith('/teaspill')}
                    isExternal={true}
                  >
                    Teaspill
                  </DropdownItem>
                  
                  <DropdownItem 
                    href="/blog" 
                    active={pathname.startsWith('/blog')}
                    isExternal={true}
                  >
                    Blog
                  </DropdownItem>
                </motion.div>
              )}
            </div>
          </motion.nav>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <Link 
              href="/#generator" 
              className="relative group overflow-hidden inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-white transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600"></span>
              <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink-600 via-blue-500 to-purple-600"></span>
              <span className="relative flex items-center">
                <span className="hidden sm:inline">Create Your</span>
                <span className="sm:hidden">Create</span> Tattoo
                <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ href, active, children, isExternal = false }: { href: string; active: boolean; children: React.ReactNode; isExternal?: boolean }) => {
  const className = `relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
    active 
      ? 'text-primary-foreground bg-primary/90' 
      : 'text-foreground hover:bg-primary/10 hover:text-primary'
  }`;
  
  if (isExternal) {
    return (
      <Link href={href} className={className}>
        {children}
        {active && (
          <motion.span
            layoutId="activeNavIndicator"
            className="absolute inset-0 rounded-md -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    );
  }
  
  return (
    <a href={href} className={className}>
      {children}
      {active && (
        <motion.span
          layoutId="activeNavIndicator"
          className="absolute inset-0 rounded-md -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </a>
  );
};

const DropdownItem = ({ href, active, children, isExternal = false }: { href: string; active: boolean; children: React.ReactNode; isExternal?: boolean }) => {
  const className = `block px-4 py-2 text-sm transition-colors duration-150 hover:bg-primary/10 ${
    active ? 'text-primary font-medium' : 'text-foreground'
  }`;
  
  if (isExternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

export default Header; 