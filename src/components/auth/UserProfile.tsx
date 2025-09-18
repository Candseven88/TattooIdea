"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { signOut } from '@/lib/services/authService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UserProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    router.push('/');
  };

  if (!currentUser) {
    return null;
  }

  const displayName = currentUser.displayName || currentUser.email || 'User';
  const avatarText = (currentUser.displayName || currentUser.email || 'U')[0].toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-transparent hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        onClick={() => setMenuOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
        title={displayName}
      >
        {currentUser.photoURL ? (
          <Image
            src={currentUser.photoURL}
            alt={displayName + ' avatar'}
            width={36}
            height={36}
            className="object-cover rounded-full"
          />
        ) : (
          <span className="flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg">
            {avatarText}
          </span>
        )}
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-medium text-gray-900 truncate">{displayName}</div>
            <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
          </div>
          {/* <Link href="/protected/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">Profile</Link> */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 