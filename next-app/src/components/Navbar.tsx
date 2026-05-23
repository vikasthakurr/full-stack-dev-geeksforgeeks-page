"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import Icon from './Icon';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes menu + scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Projects', href: '#projects' },
    { name: 'Instructor', href: '#instructor' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Careers', href: '#careers' },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = ['overview', 'curriculum', 'projects', 'instructor', 'reviews', 'careers'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (href: string) => href === `#${activeSection}`;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md py-3 border-b border-theme shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-sans font-bold text-gfg-green tracking-tight cursor-pointer">
          <motion.img 
            whileHover={{ rotate: 15 }}
            src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
            alt="GeeksforGeeks"
            className="w-8 h-8 object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-sans font-semibold text-sm transition-colors hover:text-gfg-lime ${
                isActive(link.href)
                  ? 'text-gfg-lime'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors flex items-center justify-center min-w-[40px] min-h-[40px] bg-card text-primary"
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : resolvedTheme === 'dark' ? (
            <Sun className="w-5 h-5 text-gfg-lime" />
            ) : (
              <Moon className="w-5 h-5 text-muted" />
            )}
          </motion.button>

          <Link
            href="#enroll"
            className="bg-gfg-green hover:bg-gfg-ocean text-white font-sans font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md text-sm"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-primary transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            {!mounted ? (
              <div className="w-6 h-6" />
            ) : resolvedTheme === 'dark' ? (
            <Sun className="w-6 h-6 text-gfg-lime" />
            ) : (
              <Moon className="w-6 h-6 text-muted" />
            )}
          </button>
          <button 
            className="min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen
              ? <Icon icon={['fas', 'xmark']} className="text-primary text-2xl" />
              : <Icon icon={['fas', 'bars']} className="text-primary text-2xl" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-theme shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-sans font-bold transition-colors hover:text-gfg-lime ${
                    isActive(link.href) ? 'text-gfg-lime' : 'text-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#enroll"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gfg-green text-white text-center font-sans font-bold py-3 rounded-xl"              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
