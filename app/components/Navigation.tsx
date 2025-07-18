'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import WalletConnect from './WalletConnect';
import LanguageSwitcher from './LanguageSwitcher';
import { AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/launchpad', label: t('nav.launchpad') },
    { href: '/test-wallet', label: t('nav.test') }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-terminal-black border-b border-terminal-green sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-terminal font-bold text-terminal-green glitch"
              data-text="SlowWitted Fun"
            >
              SlowWitted Fun
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-terminal text-sm transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-terminal-green border-b-2 border-terminal-green'
                      : 'text-terminal-light-green hover:text-terminal-green'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Wallet Connect */}
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-terminal-light-green hover:text-terminal-green transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-terminal-green"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 font-terminal text-sm transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-terminal-green bg-terminal-green bg-opacity-10'
                        : 'text-terminal-light-green hover:text-terminal-green hover:bg-terminal-green hover:bg-opacity-10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <WalletConnect />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 