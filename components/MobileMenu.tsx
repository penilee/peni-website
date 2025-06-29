'use client';

import Link from 'next/link';

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  isActive: (path: string) => boolean;
}

const MobileMenu = ({ isMenuOpen, closeMenu, isActive }: MobileMenuProps) => {
  return (
    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
      <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
        <Link 
          href="/" 
          onClick={closeMenu}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 transition-colors ${
            isActive('/') ? 'text-gray-300' : ''
          }`}
        >
          首頁
        </Link>
        <Link 
          href="/about" 
          onClick={closeMenu}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 transition-colors ${
            isActive('/about') ? 'text-gray-300' : ''
          }`}
        >
          關於本站
        </Link>
        <Link 
          href="/faq" 
          onClick={closeMenu}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 transition-colors ${
            isActive('/faq') ? 'text-gray-300' : ''
          }`}
        >
          常見問答
        </Link>
        <Link 
          href="/ai-chat" 
          onClick={closeMenu}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 transition-colors ${
            isActive('/ai-chat') ? 'text-gray-300' : ''
          }`}
        >
          AI聊天室
        </Link>
        <Link 
          href="/ai-lang" 
          onClick={closeMenu}
          className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 transition-colors ${
            isActive('/ai-lang') ? 'text-gray-300' : ''
          }`}
        >
          AI語言學習
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu; 