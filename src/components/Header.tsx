'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-xl font-semibold text-gray-900">Kyam Blog</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              ホーム
            </Link>
            <Link 
              href="/articles" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              記事一覧
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              プロフィール
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="メニューを開く"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-white">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                ホーム
              </Link>
              <Link
                href="/articles"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                記事一覧
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                プロフィール
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}