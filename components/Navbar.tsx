'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 靠左的內容：網站主題 */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
            沛沛的 AI 世界
          </Link>
        </div>

        {/* 桌面版：靠右的內容：導覽連結 */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`hover:text-gray-300 transition-colors ${
              isActive('/') ? 'text-gray-300 border-b-2 border-white' : ''
            }`}
          >
            首頁
          </Link>
          <Link 
            href="/about" 
            className={`hover:text-gray-300 transition-colors ${
              isActive('/about') ? 'text-gray-300 border-b-2 border-white' : ''
            }`}
          >
            關於本站
          </Link>
          <Link 
            href="/faq" 
            className={`hover:text-gray-300 transition-colors ${
              isActive('/faq') ? 'text-gray-300 border-b-2 border-white' : ''
            }`}
          >
            常見問答
          </Link>
          <Link 
            href="/ai-chat" 
            className={`hover:text-gray-300 transition-colors ${
              isActive('/ai-chat') ? 'text-gray-300 border-b-2 border-white' : ''
            }`}
          >
            AI聊天室
          </Link>
          <Link 
            href="/ai-lang" 
            className={`hover:text-gray-300 transition-colors ${
              isActive('/ai-lang') ? 'text-gray-300 border-b-2 border-white' : ''
            }`}
          >
            AI語言學習
          </Link>
        </div>

        {/* 手機版：選單按鈕 */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 transition-colors focus:outline-none"
            aria-label="切換選單"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 手機版：收合式選單 */}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} isActive={isActive} />
    </nav>
  );
};

export default Navbar;
