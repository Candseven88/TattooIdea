"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 w-full py-2 sm:py-3 bg-background/95 backdrop-blur-md z-50 border-b border-primary/20 shadow-sm">
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
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
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="flex space-x-2 bg-white/5 backdrop-blur-md rounded-full p-1 border border-primary/20">
              <Link
                href="/auth/login"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === '/auth/login'
                    ? 'bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === '/auth/register'
                    ? 'bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Register
              </Link>
            </div>
          </div>
          {children}
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Tattoo Ideas Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 