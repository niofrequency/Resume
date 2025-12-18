

import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaDownload, FaBars, FaTimes } from 'react-icons/fa';
// Fix: Import Variants type from framer-motion to resolve type inference issues with animation properties
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Theme Toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  // Fix: Explicitly typing menuVariants as Variants to ensure 'type: "spring"' is correctly recognized as AnimationGeneratorType
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Fix: Explicitly typing linkVariants as Variants
  const linkVariants: Variants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'py-4 bg-white/90 dark:bg-space-900/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
          }}
          className="text-2xl font-bold font-mono tracking-tighter text-slate-900 dark:text-white z-[110]"
        >
          MP<span className="text-primary">.dev</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-primary transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          <a 
            href="/Mark_Pigome_Resume.pdf"
            download="Mark_Pigome_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,212,255,0.3)]"
          >
            <FaDownload />
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden text-slate-900 dark:text-slate-200 text-2xl z-[110] p-2 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 w-full h-screen bg-white dark:bg-space-900 z-[100] md:hidden flex flex-col items-center justify-center p-6"
          >
            {/* Nav Links in Center */}
            <div className="flex flex-col items-center gap-8 mb-12">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  variants={linkVariants}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-3xl font-bold text-slate-800 dark:text-slate-100 hover:text-primary dark:hover:text-primary cursor-pointer tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Actions Section */}
            <motion.div 
              variants={linkVariants}
              className="w-full max-w-xs flex flex-col gap-4 items-center"
            >
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme} 
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 w-full justify-center transition-colors hover:border-primary/50"
              >
                {theme === 'dark' ? (
                  <>
                    <FaSun className="text-primary" />
                    <span className="font-semibold">Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-primary" />
                    <span className="font-semibold">Dark Mode</span>
                  </>
                )}
              </button>

              {/* Resume Download */}
              <a 
                href="/Mark_Pigome_Resume.pdf"
                download="Mark_Pigome_Resume.pdf"
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold w-full justify-center shadow-lg shadow-primary/20"
              >
                <FaDownload />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Footer Text */}
            <motion.div 
              variants={linkVariants}
              className="absolute bottom-10 text-slate-400 text-sm font-mono"
            >
              MP.dev // Portfolio
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
