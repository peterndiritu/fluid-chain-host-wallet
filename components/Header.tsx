import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Download, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../client";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleLinkClick = (page: string, id?: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    if (page === 'home' && !id) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id) {
       // Allow time for page render if switching pages
       setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  // --- Navigation Data Structure ---
  const navStructure = [
    {
      label: 'Products',
      children: [
        { label: 'Fluid Blockchain', action: () => handleLinkClick('blockchain') },
        { label: 'Wallet', action: () => handleLinkClick('wallet') },
        { label: 'Fluid DEX', action: () => handleLinkClick('dex') },
        { label: 'Fluid Crypto Cards', action: () => handleLinkClick('cards') },
        { label: 'Fluid Token', action: () => handleLinkClick('token') },
      ]
    },
    { 
      label: 'Hosting', 
      action: () => handleLinkClick('host') 
    },
    {
      label: 'Resources',
      children: [
        { label: 'About Fluid Chain', action: () => handleLinkClick('about') },
        { label: 'Roadmap', action: () => handleLinkClick('roadmap') },
        { label: 'FAQs', action: () => handleLinkClick('faq') },
        { label: 'Terms of Service', action: () => handleLinkClick('terms') },
        { label: 'Privacy Policy', action: () => handleLinkClick('privacy') },
      ]
    },
    { label: 'Support', action: () => window.open('https://t.me/fluidchain_support', '_blank') },
    { label: 'Listing', action: () => {} },
    { label: 'Community', action: () => handleLinkClick('home', 'presale') }, // Points to social links area
    { label: 'Docs', action: () => window.open('https://docs.fluid.finance', '_blank') },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 transition-transform duration-300 group-hover:scale-110">
                <path d="M20 15H80L70 35H45V45H65L60 60H45V90H25V15Z" fill="url(#logo_gradient)"/>
                <defs>
                  <linearGradient id="logo_gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </svg>
            <span className="font-bold text-xl tracking-tighter text-slate-900 dark:text-white transition-colors">
              FLUID
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-4">
            {navStructure.map((item, index) => (
              <div key={index} className="relative group">
                {item.children ? (
                  // Dropdown Trigger
                  <button className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 font-bold text-sm px-2 py-2 transition-colors">
                    {item.label} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  // Single Link
                  <button 
                    onClick={item.action} 
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 font-bold text-sm px-2 py-2 transition-colors"
                  >
                    {item.label}
                  </button>
                )}

                {/* Dropdown Menu Content */}
                {item.children && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden p-2">
                      {item.children.map((child, cIndex) => (
                        <button
                          key={cIndex}
                          onClick={child.action}
                          className="block w-full text-left px-4 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button 
                onClick={() => handleLinkClick('wallet')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <Download size={14} /> Download Wallet
            </button>
            
            <button 
                onClick={() => handleLinkClick('buy')}
                className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
                Buy FLUID
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <ConnectButton 
              client={client} 
              wallets={wallets}
              theme={theme}
              connectModal={{ size: "compact" }}
            />
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex xl:hidden items-center gap-4">
             {/* Only show theme toggle on mobile, wallet actions moved to inside menu for better space */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 absolute w-full left-0 top-16 shadow-2xl transition-colors max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 pt-4 pb-8 space-y-2">
            
            {navStructure.map((item, index) => (
              <div key={index}>
                {item.children ? (
                  // Mobile Accordion
                  <div>
                    <button 
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="w-full flex items-center justify-between text-left text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 px-4 py-3 rounded-xl text-base font-bold"
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Submenu Items */}
                    {mobileSubmenu === item.label && (
                      <div className="pl-4 pr-2 space-y-1 mt-1 mb-2 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
                        {item.children.map((child, cIndex) => (
                          <button
                            key={cIndex}
                            onClick={() => {
                              child.action();
                              setIsMenuOpen(false);
                            }}
                            className="w-full text-left block px-4 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 font-medium"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Mobile Single Link
                  <button 
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 block px-4 py-3 rounded-xl text-base font-bold"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}

            <div className="border-t border-gray-200 dark:border-slate-800 my-4 pt-4 space-y-3">
              <button 
                onClick={() => handleLinkClick('wallet')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl"
              >
                <Download size={18} /> Download Wallet
              </button>
              <button 
                onClick={() => handleLinkClick('buy')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg"
              >
                Buy FLUID Tokens
              </button>
            </div>

            <div className="flex justify-center pt-2">
              <ConnectButton 
                client={client} 
                wallets={wallets}
                theme={theme}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;